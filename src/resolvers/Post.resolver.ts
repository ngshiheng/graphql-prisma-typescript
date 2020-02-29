import { Context } from 'graphql-yoga/dist/types';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import {
    Post,
    PostCreateInput,
    PostUpdateInput,
} from '../entities/Post.entity';

@Resolver()
export class PostResolvers {
    @Query(() => Post)
    async post(
        @Ctx() { prisma }: Context,
        @Arg('id') id: string,
    ): Promise<Post> {
        const post = await prisma.post({ id });
        if (!post) {
            throw new Error('Post does not exist');
        }
        return post;
    }

    @Mutation(() => Post)
    async createPost(
        @Ctx() { prisma }: Context,
        @Arg('input', () => PostCreateInput) input: PostCreateInput,
    ): Promise<Post> {
        return prisma.createPost({ ...input });
    }

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
