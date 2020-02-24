import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import {
    AuthPayload,
    User,
    UserConnection,
    UserUpdateInput,
} from '../entities/User';

@Resolver()
export class UserResolvers {
    @Query(() => User)
    async user(@Ctx() { prisma }: any, @Arg('id') id: string): Promise<User> {
        const user = await prisma.user({ id });
        if (!user) {
            throw new Error('User does not exist');
        }
        return user;
    }

    @Query(() => UserConnection)
    async users(@Ctx() { prisma }: any): Promise<UserConnection> {
        const users = await prisma.usersConnection();
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

    @Mutation(() => AuthPayload)
    async register(
        @Ctx() { prisma }: any,
        @Arg('email') email: string,
        @Arg('password') password: string,
    ): Promise<AuthPayload> {
        const userEmail = await prisma.user({ email });
        if (userEmail) {
            throw new Error('Email is already registered');
        }
        const hashedPassword = await hash(password, 10);
        const user = await prisma.createUser({
            email,
            password: hashedPassword,
        });
        const token = sign({ userId: user.id }, 'my-little-secret', {
            expiresIn: process.env.EXPIRY,
        });
        return {
            user,
            token,
        };
    }

    @Mutation(() => AuthPayload)
    async login(
        @Ctx() { prisma }: any,
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
        const token = sign({ userId: user.id }, 'my-little-secret', {
            expiresIn: process.env.EXPIRY,
        });
        return {
            token,
            user,
        };
    }

    @Mutation(() => User)
    async updateUser(
        @Ctx() { prisma }: any,
        @Arg('id') id: string,
        @Arg('input') { email }: UserUpdateInput,
    ): Promise<User> {
        const user = await prisma.user({ id });
        if (!user) {
            throw new Error('User does not exist');
        }
        return await prisma.updateUser({
            where: { id },
            data: { email },
        });
    }

    @Mutation(() => User)
    async deleteUser(
        @Ctx() { prisma }: any,
        @Arg('id') id: string,
    ): Promise<User> {
        const user = await prisma.user({ id });
        if (!user) {
            throw new Error('User does not exist');
        }
        return await prisma.deleteUser({ id });
    }
}
