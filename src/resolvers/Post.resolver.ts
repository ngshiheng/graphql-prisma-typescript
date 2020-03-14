import {
    Post,
    PostConnection,
    PostCreateInput,
    PostPaginationArgs,
    PostUpdateInput,
} from '@entities/Post.entity';
import { User } from '@entities/User.entity';
import { ACCESS_TOKEN_SECRET } from '@utils/constants';
import { Context } from '@utils/context';
import { verify } from 'jsonwebtoken';
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
        const getAuthHeader = request.headers.authorization;
        if (getAuthHeader) {
            const token = getAuthHeader.replace('Bearer ', '');
            const { userId }: any = verify(token, ACCESS_TOKEN_SECRET);
            return await prisma.createPost({
                author: { connect: { id: userId } },
                title,
                category,
            });
        }
        throw new Error('An access token is required');
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
