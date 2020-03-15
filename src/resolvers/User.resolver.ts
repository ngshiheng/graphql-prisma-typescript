import { Post, PostPaginationArgs } from '@entities/Post.entity';
import {
    AuthPayload,
    MessagePayload,
    User,
    UserAuthenticationArgs,
    UserConnection,
    UserCreateInput,
    UserPaginationArgs,
    UserUpdateInput,
} from '@entities/User.entity';
import {
    ACCESS_TOKEN_EXPIRY,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRY,
    REFRESH_TOKEN_SECRET,
    SALT_ROUNDS,
} from '@utils/constants';
import { Context } from '@utils/context';
import { sendPasswordResetEmail } from '@utils/mailer';
import { compare, hash } from 'bcryptjs';
import { decode, sign, verify } from 'jsonwebtoken';
import {
    Arg,
    Args,
    Authorized,
    Ctx,
    FieldResolver,
    Mutation,
    Query,
    Resolver,
    Root,
} from 'type-graphql';

@Resolver(User)
export class UserResolvers {
    @Query(() => User)
    async user(
        @Ctx() { prisma }: Context,
        @Arg('id') id: string,
    ): Promise<Partial<Post>> {
        const user = await prisma.user({ id });
        if (!user) {
            throw new Error('User does not exist');
        }
        return user;
    }

    @Query(() => UserConnection)
    async users(
        @Ctx() { prisma }: Context,
        @Args()
        {
            filter,
            skip,
            after,
            before,
            first,
            last,
            orderBy,
        }: UserPaginationArgs,
    ) {
        const where = filter
            ? {
                  OR: [{ email_contains: filter }, { name_contains: filter }],
              }
            : {};
        const users = await prisma.usersConnection({
            where,
            skip,
            after,
            before,
            first,
            last,
            orderBy,
        });
        const totalCount = await prisma
            .usersConnection({ where })
            .aggregate()
            .count();

        return {
            edges: users.edges,
            pageInfo: users.pageInfo,
            totalCount,
        };
    }

    @Authorized('ADMIN')
    @Mutation(() => User)
    async createUser(
        @Ctx() { prisma }: Context,
        @Arg('input', () => UserCreateInput)
        { email, password, role, name }: UserCreateInput,
    ): Promise<Partial<Post>> {
        const userEmail = await prisma.user({ email });
        if (userEmail) {
            throw new Error('Email is already registered');
        }
        const hashedPassword = await hash(password, SALT_ROUNDS);
        return await prisma.createUser({
            name,
            role,
            email,
            password: hashedPassword,
        });
    }

    @Mutation(() => User)
    async register(
        @Ctx() { prisma }: Context,
        @Args() { email, password, name }: UserAuthenticationArgs,
    ): Promise<Partial<Post>> {
        const userEmail = await prisma.user({ email });
        if (userEmail) {
            throw new Error('Email is already registered');
        }
        const hashedPassword = await hash(password, 10);
        return await prisma.createUser({
            name,
            email,
            password: hashedPassword,
        });
    }

    @Mutation(() => AuthPayload)
    async login(
        @Ctx() { prisma }: Context,
        @Args() { email, password }: UserAuthenticationArgs,
    ): Promise<AuthPayload> {
        const user = await prisma.user({ email });
        if (!user) {
            throw new Error('User does not exist'); // Note: Use ambiguous error message in production
        }
        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Incorrect password');
        }
        const token = sign(
            { userId: user.id, role: user.role },
            ACCESS_TOKEN_SECRET,
            {
                expiresIn: ACCESS_TOKEN_EXPIRY,
            },
        );
        const refreshToken = sign({ userId: user.id }, REFRESH_TOKEN_SECRET, {
            expiresIn: REFRESH_TOKEN_EXPIRY,
        });
        await prisma.updateUser({
            where: { email },
            data: { refreshToken },
        });
        return {
            token,
            refreshToken,
        };
    }

    @Authorized('OWNER')
    @Mutation(() => User)
    async updateUser(
        @Ctx() { prisma }: Context,
        @Arg('id') id: string,
        @Arg('input') input: UserUpdateInput,
    ): Promise<Partial<Post>> {
        const user = await prisma.user({ id });
        if (!user) {
            throw new Error('User does not exist');
        }
        return await prisma.updateUser({
            where: { id },
            data: { ...input },
        });
    }

    @Authorized('OWNER')
    @Mutation(() => User)
    async deleteUser(
        @Ctx() { prisma }: Context,
        @Arg('id') id: string,
    ): Promise<Partial<Post>> {
        const user = await prisma.user({ id });
        if (!user) {
            throw new Error('User does not exist');
        }
        return await prisma.deleteUser({ id });
    }

    @Mutation(() => MessagePayload)
    async resetPassword(
        @Ctx() { prisma }: Context,
        @Arg('email') email: string,
    ): Promise<MessagePayload> {
        const user = await prisma.user({ email });
        if (!user) {
            throw new Error('User does not exist'); // Note: This should return the same message as sendPasswordResetEmail
        }
        // Note: Using currentPassword as a payload during password reset allows the password reset token to work as a single-use token
        const token = sign(
            { userEmail: email, currentPassword: user.password },
            ACCESS_TOKEN_SECRET, // Note: Sign this with another secret in production
            {
                expiresIn: ACCESS_TOKEN_EXPIRY,
            },
        );
        sendPasswordResetEmail(email, token);
        return {
            message: 'Password reset email sent. Please check your inbox',
        };
    }

    @Mutation(() => MessagePayload)
    async updatePassword(
        @Ctx() { prisma, request }: Context,
        @Arg('password') password: string,
    ): Promise<MessagePayload> {
        const getAuthHeader = request.headers.authorization;
        if (getAuthHeader) {
            const token = getAuthHeader.replace('Bearer ', '');
            const { userEmail, currentPassword }: any = verify(
                token,
                ACCESS_TOKEN_SECRET,
            );
            const user = await prisma.user({ email: userEmail });
            if (!user) {
                throw new Error('User does not exist');
            }
            if (user.password === currentPassword) {
                const hashedPassword = await hash(password, SALT_ROUNDS);
                await prisma.updateUser({
                    where: { email: userEmail },
                    data: { password: hashedPassword, refreshToken: null },
                });
                return {
                    message:
                        'Password reset successful. You may now login with your new password',
                };
            } else {
                throw new Error(
                    'You may only reset your password once with the current token',
                );
            }
        }
        throw new Error('Invalid token');
    }

    @Mutation(() => AuthPayload)
    async refreshLogin(
        @Ctx() { prisma, request }: Context,
        @Arg('refreshToken') refreshToken: string,
    ): Promise<AuthPayload> {
        const getAuthHeader = request.headers.authorization;
        if (getAuthHeader) {
            const accessToken = getAuthHeader.replace('Bearer ', '');
            const { userId }: any = decode(accessToken);
            const user = await prisma.user({ id: userId });
            if (user?.refreshToken === refreshToken) {
                const isValid = verify(refreshToken, REFRESH_TOKEN_SECRET);
                if (isValid) {
                    const newAccessToken = sign(
                        { userId, role: user.role },
                        ACCESS_TOKEN_SECRET,
                        {
                            expiresIn: ACCESS_TOKEN_EXPIRY,
                        },
                    );
                    // Note: Sending back a new refreshToken is optional
                    const newRefreshToken = sign(
                        { userId },
                        REFRESH_TOKEN_SECRET,
                        {
                            expiresIn: REFRESH_TOKEN_EXPIRY,
                        },
                    );
                    await prisma.updateUser({
                        where: { id: userId },
                        data: { refreshToken: newRefreshToken },
                    });
                    return {
                        token: newAccessToken,
                        refreshToken: newRefreshToken,
                    };
                } else {
                    throw new Error(
                        'Your refresh token has expired, please login again',
                    );
                }
            } else {
                throw new Error(
                    'Your refresh token is invalid, please login again',
                );
            }
        }
        throw new Error('An access token is required');
    }

    @FieldResolver()
    async posts(
        @Ctx() { prisma }: Context,
        @Root() { id }: User,
        @Args()
        {
            filter,
            skip,
            after,
            before,
            first,
            last,
            orderBy,
        }: PostPaginationArgs,
    ) {
        const where = filter
            ? { AND: [{ author: { id }, title_contains: filter }] }
            : { author: { id } };
        const posts = await prisma.postsConnection({
            where,
            skip,
            after,
            before,
            first,
            last,
            orderBy,
        });
        const totalCount = await prisma
            .postsConnection({ where })
            .aggregate()
            .count();

        return {
            edges: posts.edges,
            pageInfo: posts.pageInfo,
            totalCount,
        };
    }
}
