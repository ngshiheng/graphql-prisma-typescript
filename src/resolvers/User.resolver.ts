import { compare, hash } from 'bcryptjs';
import { Context } from 'graphql-yoga/dist/types';
import { sign } from 'jsonwebtoken';
import {
    Arg,
    Authorized,
    Ctx,
    Int,
    Mutation,
    Query,
    Resolver,
} from 'type-graphql';
import {
    AuthPayload,
    User,
    UserConnection,
    UserCreateInput,
    UserOrderByInput,
    UserUpdateInput,
} from '../entities/User.entity';
import { APP_SECRET, TOKEN_EXPIRY } from '../utils/constants';

@Resolver()
export class UserResolvers {
    @Authorized('USER')
    @Query(() => User)
    async user(
        @Ctx() { prisma }: Context,
        @Arg('id') id: string,
    ): Promise<User> {
        const user = await prisma.user({ id }).posts();
        if (!user) {
            throw new Error('User does not exist');
        }
        return user;
    }

    @Authorized('USER')
    @Query(() => UserConnection)
    async users(
        @Ctx() { prisma }: Context,
        @Arg('filter', { nullable: true }) filter: string,
        @Arg('skip', () => Int, { nullable: true }) skip: number,
        @Arg('after', { nullable: true }) after: string,
        @Arg('before', { nullable: true }) before: string,
        @Arg('first', () => Int, { nullable: true }) first: number,
        @Arg('last', () => Int, { nullable: true }) last: number,
        @Arg('orderBy', () => UserOrderByInput, { nullable: true })
        orderBy: UserOrderByInput,
    ): Promise<UserConnection> {
        const where = filter ? { OR: [{ email_contains: filter }] } : {};
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
            .usersConnection()
            .aggregate()
            .count();

        return {
            edges: users.edges,
            pageInfo: users.pageInfo,
            totalCount,
        };
    }

    @Authorized('ADMIN')
    @Mutation(() => AuthPayload)
    async createUser(
        @Ctx() { prisma }: Context,
        @Arg('input', () => UserCreateInput)
        { email, password, role, name }: UserCreateInput,
    ): Promise<AuthPayload> {
        const userEmail = await prisma.user({ email });
        if (userEmail) {
            throw new Error('Email is already registered');
        }
        const hashedPassword = await hash(password, 10);
        const user = await prisma.createUser({
            name,
            role,
            email,
            password: hashedPassword,
        });
        const token = sign({ userId: user.id, role: user.role }, APP_SECRET, {
            expiresIn: TOKEN_EXPIRY,
        });
        return {
            user,
            token,
        };
    }

    @Mutation(() => AuthPayload)
    async register(
        @Ctx() { prisma }: Context,
        @Arg('name', { nullable: true }) name: string,
        @Arg('password') password: string,
        @Arg('email') email: string,
    ): Promise<AuthPayload> {
        const userEmail = await prisma.user({ email });
        if (userEmail) {
            throw new Error('Email is already registered');
        }
        const hashedPassword = await hash(password, 10);
        const user = await prisma.createUser({
            name,
            email,
            password: hashedPassword,
        });
        const token = sign({ userId: user.id, role: user.role }, APP_SECRET, {
            expiresIn: TOKEN_EXPIRY,
        });
        return {
            user,
            token,
        };
    }

    @Mutation(() => AuthPayload)
    async login(
        @Ctx() { prisma }: Context,
        @Arg('email') email: string,
        @Arg('password') password: string,
    ): Promise<AuthPayload> {
        const user = await prisma.user({ email });
        if (!user) {
            throw new Error('User does not exist');
        }
        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Incorrect password');
        }
        const token: any = sign({ userId: user.id }, APP_SECRET, {
            expiresIn: TOKEN_EXPIRY,
        });
        return {
            token,
            user,
        };
    }

    @Authorized('OWNER')
    @Mutation(() => User)
    async updateUser(
        @Ctx() { prisma }: Context,
        @Arg('id') id: string,
        @Arg('input') input: UserUpdateInput,
    ): Promise<User> {
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
    ): Promise<User> {
        const user = await prisma.user({ id });
        if (!user) {
            throw new Error('User does not exist');
        }
        return await prisma.deleteUser({ id });
    }
}
