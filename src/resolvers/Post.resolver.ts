import { Context } from 'graphql-yoga/dist/types';
import { verify } from 'jsonwebtoken';
import {
    Arg,
    Authorized,
    Ctx,
    FieldResolver,
    Int,
    Mutation,
    Query,
    Resolver,
    Root,
} from 'type-graphql';
import {
    Post,
    PostConnection,
    PostCreateInput,
    PostOrderByInput,
    PostUpdateInput,
} from '../entities/Post.entity';
import { APP_SECRET } from '../utils/constants';

@Resolver(() => Post)
export class PostResolvers {
    @Query(() => Post)
    async post(
        @Ctx() { prisma }: Context,
        @Arg('id') id: string,
    ): Promise<Post> {
        return await prisma.post({ id });
    }

    @Query(() => PostConnection)
    async posts(
        @Ctx() { prisma }: Context,
        @Arg('filter', { nullable: true }) filter: string,
        @Arg('skip', () => Int, { nullable: true }) skip: number,
        @Arg('after', { nullable: true }) after: string,
        @Arg('before', { nullable: true }) before: string,
        @Arg('first', () => Int, { nullable: true }) first: number,
        @Arg('last', () => Int, { nullable: true }) last: number,
        @Arg('orderBy', () => PostOrderByInput, { nullable: true })
        orderBy: PostOrderByInput,
    ): Promise<PostConnection> {
        const where = filter ? { OR: [{ title_contains: filter }] } : {};
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
            .postsConnection()
            .aggregate()
            .count();

        return {
            edges: posts.edges,
            pageInfo: posts.pageInfo,
            totalCount,
        };
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

    @FieldResolver()
    async author(
        @Ctx() { prisma }: Context,
        @Root() { id }: Post,
    ): Promise<Post> {
        return prisma.post({ id }).author();
    }
}
