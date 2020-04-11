import {
    Post,
    PostConnection,
    PostCreateInput,
    PostPaginationArgs,
    PostUpdateInput,
} from '@entities/Post.entity';
import { User } from '@entities/User.entity';
import { getUserId, Session } from '@src/authentication/authenticate';
import { Context } from '@src/index';
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

@Resolver(Post)
export class PostResolvers {
    @Query(() => Post)
    async post(
        @Ctx() { prisma }: Context,
        @Arg('id') id: string,
    ): Promise<Partial<User>> {
        const post = await prisma.post({ id });
        if (!post) {
            throw new Error('Post does not exist');
        }
        return post;
    }

    @Query(() => PostConnection)
    async posts(
        @Ctx() { prisma }: Context,
        @Args()
        { filter, ...args }: PostPaginationArgs,
    ) {
        const where = filter ? { OR: [{ title_contains: filter }] } : {};
        const posts = await prisma.postsConnection({
            where,
            ...args,
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

    @Mutation(() => Post)
    async createPost(
        @Ctx() { prisma, request }: Context,
        @Arg('input', () => PostCreateInput)
        { title, category }: PostCreateInput,
    ): Promise<Partial<User>> {
        const { userId }: Session = await getUserId({ prisma, request });
        return await prisma.createPost({
            author: { connect: { id: userId } },
            title,
            category,
        });
    }

    @Authorized('OWNER')
    @Mutation(() => Post)
    async updatePost(
        @Arg('id') id: string,
        @Ctx() { prisma }: Context,
        @Arg('input', () => PostUpdateInput) input: PostUpdateInput,
    ): Promise<Partial<User>> {
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
    ): Promise<Partial<User>> {
        return await prisma.deletePost({ id });
    }

    @FieldResolver()
    async author(
        @Ctx() { prisma }: Context,
        @Root() { id }: Post,
    ): Promise<User> {
        return prisma.post({ id }).author();
    }
}
