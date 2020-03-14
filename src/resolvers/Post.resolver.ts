import {
    Post,
    PostConnection,
    PostCreateInput,
    PostOrderByInput,
    PostUpdateInput,
} from '@entities/Post.entity';
import { User } from '@entities/User.entity';
import { APP_SECRET } from '@utils/constants';
import { Context } from '@utils/context';
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
        @Arg('filter', { nullable: true }) filter: string,
        @Arg('skip', () => Int, { nullable: true }) skip: number,
        @Arg('after', { nullable: true }) after: string,
        @Arg('before', { nullable: true }) before: string,
        @Arg('first', () => Int, { nullable: true }) first: number,
        @Arg('last', () => Int, { nullable: true }) last: number,
        @Arg('orderBy', () => PostOrderByInput, { nullable: true })
        orderBy: PostOrderByInput,
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
