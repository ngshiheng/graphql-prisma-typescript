import { Context } from 'graphql-yoga/dist/types';
import { verify } from 'jsonwebtoken';
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import {
    Post,
    PostCreateInput,
    PostUpdateInput,
} from '../entities/Post.entity';
import { APP_SECRET } from '../utils/constants';

@Resolver()
export class PostResolvers {
    @Query(() => Post)
    async post(
        @Ctx() { prisma }: Context,
        @Arg('id') id: string,
    ): Promise<Post> {
        return await prisma.post({ id });
    }

    @Authorized('USER')
    @Mutation(() => Post)
    async createPost(
        @Ctx() { prisma, request }: Context,
        @Arg('input', () => PostCreateInput)
        { title, category }: PostCreateInput,
    ): Promise<Post> {
        const getAuthHeader = request.get('Authorization');
        if (getAuthHeader) {
            const token = getAuthHeader.replace('Bearer ', '');
            const { userId }: any = verify(token, APP_SECRET);
            return await prisma.createPost({
                author: { connect: { id: userId } },
                title,
                category,
            });
        }
        throw new Error('You need to register for an account first');
    }

    @Authorized('OWNER')
    @Mutation(() => Post)
    async updatePost(
        @Arg('id') id: string,
        @Ctx() { prisma }: Context,
        @Arg('input', () => PostUpdateInput) input: PostUpdateInput,
    ): Promise<Post> {
        const post = await prisma.post({ id });
        if (!post) {
            throw new Error('Post does not exist');
        }
        return await prisma.updatePost({
            where: { id },
            data: { ...input },
        });
    }

    @Authorized('OWNER')
    @Mutation(() => Post)
    async deletePost(
        @Ctx() { prisma }: Context,
        @Arg('id') id: string,
    ): Promise<Post> {
        const post = await prisma.post({ id });
        if (!post) {
            throw new Error('Post does not exist');
        }
        return await prisma.deletePost({ id });
    }
}
