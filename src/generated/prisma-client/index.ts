// Code generated by Prisma (prisma@1.34.10). DO NOT EDIT.
// Please don't change this file manually but run `prisma generate` to update it.
// For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

import { DocumentNode } from 'graphql';
import {
    makePrismaClientClass,
    BaseClientOptions,
    Model,
} from 'prisma-client-lib';
import { typeDefs } from './prisma-schema';

export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
    U[keyof U];

export type Maybe<T> = T | undefined | null;

export interface Exists {
    post: (where?: PostWhereInput) => Promise<boolean>;
    user: (where?: UserWhereInput) => Promise<boolean>;
}

export interface Node {}

export type FragmentableArray<T> = Promise<Array<T>> & Fragmentable;

export interface Fragmentable {
    $fragment<T>(fragment: string | DocumentNode): Promise<T>;
}

export interface Prisma {
    $exists: Exists;
    $graphql: <T = any>(
        query: string,
        variables?: { [key: string]: any },
    ) => Promise<T>;

    /**
     * Queries
     */

    post: (where: PostWhereUniqueInput) => PostNullablePromise;
    posts: (args?: {
        where?: PostWhereInput;
        orderBy?: PostOrderByInput;
        skip?: Int;
        after?: String;
        before?: String;
        first?: Int;
        last?: Int;
    }) => FragmentableArray<Post>;
    postsConnection: (args?: {
        where?: PostWhereInput;
        orderBy?: PostOrderByInput;
        skip?: Int;
        after?: String;
        before?: String;
        first?: Int;
        last?: Int;
    }) => PostConnectionPromise;
    user: (where: UserWhereUniqueInput) => UserNullablePromise;
    users: (args?: {
        where?: UserWhereInput;
        orderBy?: UserOrderByInput;
        skip?: Int;
        after?: String;
        before?: String;
        first?: Int;
        last?: Int;
    }) => FragmentableArray<User>;
    usersConnection: (args?: {
        where?: UserWhereInput;
        orderBy?: UserOrderByInput;
        skip?: Int;
        after?: String;
        before?: String;
        first?: Int;
        last?: Int;
    }) => UserConnectionPromise;
    node: (args: { id: ID_Output }) => Node;

    /**
     * Mutations
     */

    createPost: (data: PostCreateInput) => PostPromise;
    updatePost: (args: {
        data: PostUpdateInput;
        where: PostWhereUniqueInput;
    }) => PostPromise;
    updateManyPosts: (args: {
        data: PostUpdateManyMutationInput;
        where?: PostWhereInput;
    }) => BatchPayloadPromise;
    upsertPost: (args: {
        where: PostWhereUniqueInput;
        create: PostCreateInput;
        update: PostUpdateInput;
    }) => PostPromise;
    deletePost: (where: PostWhereUniqueInput) => PostPromise;
    deleteManyPosts: (where?: PostWhereInput) => BatchPayloadPromise;
    createUser: (data: UserCreateInput) => UserPromise;
    updateUser: (args: {
        data: UserUpdateInput;
        where: UserWhereUniqueInput;
    }) => UserPromise;
    updateManyUsers: (args: {
        data: UserUpdateManyMutationInput;
        where?: UserWhereInput;
    }) => BatchPayloadPromise;
    upsertUser: (args: {
        where: UserWhereUniqueInput;
        create: UserCreateInput;
        update: UserUpdateInput;
    }) => UserPromise;
    deleteUser: (where: UserWhereUniqueInput) => UserPromise;
    deleteManyUsers: (where?: UserWhereInput) => BatchPayloadPromise;

    /**
     * Subscriptions
     */

    $subscribe: Subscription;
}

export interface Subscription {
    post: (
        where?: PostSubscriptionWhereInput,
    ) => PostSubscriptionPayloadSubscription;
    user: (
        where?: UserSubscriptionWhereInput,
    ) => UserSubscriptionPayloadSubscription;
}

export interface ClientConstructor<T> {
    new (options?: BaseClientOptions): T;
}

/**
 * Types
 */

export type Category =
    | 'CAREER'
    | 'EDUCATION'
    | 'FINANCE'
    | 'FITNESS'
    | 'FOOD'
    | 'GAMING'
    | 'HEALTH'
    | 'NATURE'
    | 'OTHER'
    | 'PETS'
    | 'SPORTS'
    | 'TECHNOLOGY';

export type UserRole = 'ADMIN' | 'USER';

export type PostOrderByInput =
    | 'id_ASC'
    | 'id_DESC'
    | 'title_ASC'
    | 'title_DESC'
    | 'category_ASC'
    | 'category_DESC'
    | 'createdAt_ASC'
    | 'createdAt_DESC'
    | 'updatedAt_ASC'
    | 'updatedAt_DESC';

export type UserOrderByInput =
    | 'id_ASC'
    | 'id_DESC'
    | 'name_ASC'
    | 'name_DESC'
    | 'email_ASC'
    | 'email_DESC'
    | 'password_ASC'
    | 'password_DESC'
    | 'role_ASC'
    | 'role_DESC'
    | 'refreshToken_ASC'
    | 'refreshToken_DESC'
    | 'createdAt_ASC'
    | 'createdAt_DESC'
    | 'updatedAt_ASC'
    | 'updatedAt_DESC';

export type MutationType = 'CREATED' | 'UPDATED' | 'DELETED';

export type PostWhereUniqueInput = AtLeastOne<{
    id: Maybe<ID_Input>;
}>;

export interface PostWhereInput {
    id?: Maybe<ID_Input>;
    id_not?: Maybe<ID_Input>;
    id_in?: Maybe<ID_Input[] | ID_Input>;
    id_not_in?: Maybe<ID_Input[] | ID_Input>;
    id_lt?: Maybe<ID_Input>;
    id_lte?: Maybe<ID_Input>;
    id_gt?: Maybe<ID_Input>;
    id_gte?: Maybe<ID_Input>;
    id_contains?: Maybe<ID_Input>;
    id_not_contains?: Maybe<ID_Input>;
    id_starts_with?: Maybe<ID_Input>;
    id_not_starts_with?: Maybe<ID_Input>;
    id_ends_with?: Maybe<ID_Input>;
    id_not_ends_with?: Maybe<ID_Input>;
    title?: Maybe<String>;
    title_not?: Maybe<String>;
    title_in?: Maybe<String[] | String>;
    title_not_in?: Maybe<String[] | String>;
    title_lt?: Maybe<String>;
    title_lte?: Maybe<String>;
    title_gt?: Maybe<String>;
    title_gte?: Maybe<String>;
    title_contains?: Maybe<String>;
    title_not_contains?: Maybe<String>;
    title_starts_with?: Maybe<String>;
    title_not_starts_with?: Maybe<String>;
    title_ends_with?: Maybe<String>;
    title_not_ends_with?: Maybe<String>;
    category?: Maybe<Category>;
    category_not?: Maybe<Category>;
    category_in?: Maybe<Category[] | Category>;
    category_not_in?: Maybe<Category[] | Category>;
    author?: Maybe<UserWhereInput>;
    createdAt?: Maybe<DateTimeInput>;
    createdAt_not?: Maybe<DateTimeInput>;
    createdAt_in?: Maybe<DateTimeInput[] | DateTimeInput>;
    createdAt_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
    createdAt_lt?: Maybe<DateTimeInput>;
    createdAt_lte?: Maybe<DateTimeInput>;
    createdAt_gt?: Maybe<DateTimeInput>;
    createdAt_gte?: Maybe<DateTimeInput>;
    updatedAt?: Maybe<DateTimeInput>;
    updatedAt_not?: Maybe<DateTimeInput>;
    updatedAt_in?: Maybe<DateTimeInput[] | DateTimeInput>;
    updatedAt_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
    updatedAt_lt?: Maybe<DateTimeInput>;
    updatedAt_lte?: Maybe<DateTimeInput>;
    updatedAt_gt?: Maybe<DateTimeInput>;
    updatedAt_gte?: Maybe<DateTimeInput>;
    AND?: Maybe<PostWhereInput[] | PostWhereInput>;
    OR?: Maybe<PostWhereInput[] | PostWhereInput>;
    NOT?: Maybe<PostWhereInput[] | PostWhereInput>;
}

export interface UserWhereInput {
    id?: Maybe<ID_Input>;
    id_not?: Maybe<ID_Input>;
    id_in?: Maybe<ID_Input[] | ID_Input>;
    id_not_in?: Maybe<ID_Input[] | ID_Input>;
    id_lt?: Maybe<ID_Input>;
    id_lte?: Maybe<ID_Input>;
    id_gt?: Maybe<ID_Input>;
    id_gte?: Maybe<ID_Input>;
    id_contains?: Maybe<ID_Input>;
    id_not_contains?: Maybe<ID_Input>;
    id_starts_with?: Maybe<ID_Input>;
    id_not_starts_with?: Maybe<ID_Input>;
    id_ends_with?: Maybe<ID_Input>;
    id_not_ends_with?: Maybe<ID_Input>;
    name?: Maybe<String>;
    name_not?: Maybe<String>;
    name_in?: Maybe<String[] | String>;
    name_not_in?: Maybe<String[] | String>;
    name_lt?: Maybe<String>;
    name_lte?: Maybe<String>;
    name_gt?: Maybe<String>;
    name_gte?: Maybe<String>;
    name_contains?: Maybe<String>;
    name_not_contains?: Maybe<String>;
    name_starts_with?: Maybe<String>;
    name_not_starts_with?: Maybe<String>;
    name_ends_with?: Maybe<String>;
    name_not_ends_with?: Maybe<String>;
    email?: Maybe<String>;
    email_not?: Maybe<String>;
    email_in?: Maybe<String[] | String>;
    email_not_in?: Maybe<String[] | String>;
    email_lt?: Maybe<String>;
    email_lte?: Maybe<String>;
    email_gt?: Maybe<String>;
    email_gte?: Maybe<String>;
    email_contains?: Maybe<String>;
    email_not_contains?: Maybe<String>;
    email_starts_with?: Maybe<String>;
    email_not_starts_with?: Maybe<String>;
    email_ends_with?: Maybe<String>;
    email_not_ends_with?: Maybe<String>;
    password?: Maybe<String>;
    password_not?: Maybe<String>;
    password_in?: Maybe<String[] | String>;
    password_not_in?: Maybe<String[] | String>;
    password_lt?: Maybe<String>;
    password_lte?: Maybe<String>;
    password_gt?: Maybe<String>;
    password_gte?: Maybe<String>;
    password_contains?: Maybe<String>;
    password_not_contains?: Maybe<String>;
    password_starts_with?: Maybe<String>;
    password_not_starts_with?: Maybe<String>;
    password_ends_with?: Maybe<String>;
    password_not_ends_with?: Maybe<String>;
    role?: Maybe<UserRole>;
    role_not?: Maybe<UserRole>;
    role_in?: Maybe<UserRole[] | UserRole>;
    role_not_in?: Maybe<UserRole[] | UserRole>;
    posts_every?: Maybe<PostWhereInput>;
    posts_some?: Maybe<PostWhereInput>;
    posts_none?: Maybe<PostWhereInput>;
    refreshToken?: Maybe<String>;
    refreshToken_not?: Maybe<String>;
    refreshToken_in?: Maybe<String[] | String>;
    refreshToken_not_in?: Maybe<String[] | String>;
    refreshToken_lt?: Maybe<String>;
    refreshToken_lte?: Maybe<String>;
    refreshToken_gt?: Maybe<String>;
    refreshToken_gte?: Maybe<String>;
    refreshToken_contains?: Maybe<String>;
    refreshToken_not_contains?: Maybe<String>;
    refreshToken_starts_with?: Maybe<String>;
    refreshToken_not_starts_with?: Maybe<String>;
    refreshToken_ends_with?: Maybe<String>;
    refreshToken_not_ends_with?: Maybe<String>;
    createdAt?: Maybe<DateTimeInput>;
    createdAt_not?: Maybe<DateTimeInput>;
    createdAt_in?: Maybe<DateTimeInput[] | DateTimeInput>;
    createdAt_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
    createdAt_lt?: Maybe<DateTimeInput>;
    createdAt_lte?: Maybe<DateTimeInput>;
    createdAt_gt?: Maybe<DateTimeInput>;
    createdAt_gte?: Maybe<DateTimeInput>;
    updatedAt?: Maybe<DateTimeInput>;
    updatedAt_not?: Maybe<DateTimeInput>;
    updatedAt_in?: Maybe<DateTimeInput[] | DateTimeInput>;
    updatedAt_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
    updatedAt_lt?: Maybe<DateTimeInput>;
    updatedAt_lte?: Maybe<DateTimeInput>;
    updatedAt_gt?: Maybe<DateTimeInput>;
    updatedAt_gte?: Maybe<DateTimeInput>;
    AND?: Maybe<UserWhereInput[] | UserWhereInput>;
    OR?: Maybe<UserWhereInput[] | UserWhereInput>;
    NOT?: Maybe<UserWhereInput[] | UserWhereInput>;
}

export type UserWhereUniqueInput = AtLeastOne<{
    id: Maybe<ID_Input>;
    email?: Maybe<String>;
}>;

export interface PostCreateInput {
    id?: Maybe<ID_Input>;
    title: String;
    category?: Maybe<Category>;
    author: UserCreateOneWithoutPostsInput;
}

export interface UserCreateOneWithoutPostsInput {
    create?: Maybe<UserCreateWithoutPostsInput>;
    connect?: Maybe<UserWhereUniqueInput>;
}

export interface UserCreateWithoutPostsInput {
    id?: Maybe<ID_Input>;
    name?: Maybe<String>;
    email: String;
    password: String;
    role?: Maybe<UserRole>;
    refreshToken?: Maybe<String>;
}

export interface PostUpdateInput {
    title?: Maybe<String>;
    category?: Maybe<Category>;
    author?: Maybe<UserUpdateOneRequiredWithoutPostsInput>;
}

export interface UserUpdateOneRequiredWithoutPostsInput {
    create?: Maybe<UserCreateWithoutPostsInput>;
    update?: Maybe<UserUpdateWithoutPostsDataInput>;
    upsert?: Maybe<UserUpsertWithoutPostsInput>;
    connect?: Maybe<UserWhereUniqueInput>;
}

export interface UserUpdateWithoutPostsDataInput {
    name?: Maybe<String>;
    email?: Maybe<String>;
    password?: Maybe<String>;
    role?: Maybe<UserRole>;
    refreshToken?: Maybe<String>;
}

export interface UserUpsertWithoutPostsInput {
    update: UserUpdateWithoutPostsDataInput;
    create: UserCreateWithoutPostsInput;
}

export interface PostUpdateManyMutationInput {
    title?: Maybe<String>;
    category?: Maybe<Category>;
}

export interface UserCreateInput {
    id?: Maybe<ID_Input>;
    name?: Maybe<String>;
    email: String;
    password: String;
    role?: Maybe<UserRole>;
    posts?: Maybe<PostCreateManyWithoutAuthorInput>;
    refreshToken?: Maybe<String>;
}

export interface PostCreateManyWithoutAuthorInput {
    create?: Maybe<
        PostCreateWithoutAuthorInput[] | PostCreateWithoutAuthorInput
    >;
    connect?: Maybe<PostWhereUniqueInput[] | PostWhereUniqueInput>;
}

export interface PostCreateWithoutAuthorInput {
    id?: Maybe<ID_Input>;
    title: String;
    category?: Maybe<Category>;
}

export interface UserUpdateInput {
    name?: Maybe<String>;
    email?: Maybe<String>;
    password?: Maybe<String>;
    role?: Maybe<UserRole>;
    posts?: Maybe<PostUpdateManyWithoutAuthorInput>;
    refreshToken?: Maybe<String>;
}

export interface PostUpdateManyWithoutAuthorInput {
    create?: Maybe<
        PostCreateWithoutAuthorInput[] | PostCreateWithoutAuthorInput
    >;
    delete?: Maybe<PostWhereUniqueInput[] | PostWhereUniqueInput>;
    connect?: Maybe<PostWhereUniqueInput[] | PostWhereUniqueInput>;
    set?: Maybe<PostWhereUniqueInput[] | PostWhereUniqueInput>;
    disconnect?: Maybe<PostWhereUniqueInput[] | PostWhereUniqueInput>;
    update?: Maybe<
        | PostUpdateWithWhereUniqueWithoutAuthorInput[]
        | PostUpdateWithWhereUniqueWithoutAuthorInput
    >;
    upsert?: Maybe<
        | PostUpsertWithWhereUniqueWithoutAuthorInput[]
        | PostUpsertWithWhereUniqueWithoutAuthorInput
    >;
    deleteMany?: Maybe<PostScalarWhereInput[] | PostScalarWhereInput>;
    updateMany?: Maybe<
        | PostUpdateManyWithWhereNestedInput[]
        | PostUpdateManyWithWhereNestedInput
    >;
}

export interface PostUpdateWithWhereUniqueWithoutAuthorInput {
    where: PostWhereUniqueInput;
    data: PostUpdateWithoutAuthorDataInput;
}

export interface PostUpdateWithoutAuthorDataInput {
    title?: Maybe<String>;
    category?: Maybe<Category>;
}

export interface PostUpsertWithWhereUniqueWithoutAuthorInput {
    where: PostWhereUniqueInput;
    update: PostUpdateWithoutAuthorDataInput;
    create: PostCreateWithoutAuthorInput;
}

export interface PostScalarWhereInput {
    id?: Maybe<ID_Input>;
    id_not?: Maybe<ID_Input>;
    id_in?: Maybe<ID_Input[] | ID_Input>;
    id_not_in?: Maybe<ID_Input[] | ID_Input>;
    id_lt?: Maybe<ID_Input>;
    id_lte?: Maybe<ID_Input>;
    id_gt?: Maybe<ID_Input>;
    id_gte?: Maybe<ID_Input>;
    id_contains?: Maybe<ID_Input>;
    id_not_contains?: Maybe<ID_Input>;
    id_starts_with?: Maybe<ID_Input>;
    id_not_starts_with?: Maybe<ID_Input>;
    id_ends_with?: Maybe<ID_Input>;
    id_not_ends_with?: Maybe<ID_Input>;
    title?: Maybe<String>;
    title_not?: Maybe<String>;
    title_in?: Maybe<String[] | String>;
    title_not_in?: Maybe<String[] | String>;
    title_lt?: Maybe<String>;
    title_lte?: Maybe<String>;
    title_gt?: Maybe<String>;
    title_gte?: Maybe<String>;
    title_contains?: Maybe<String>;
    title_not_contains?: Maybe<String>;
    title_starts_with?: Maybe<String>;
    title_not_starts_with?: Maybe<String>;
    title_ends_with?: Maybe<String>;
    title_not_ends_with?: Maybe<String>;
    category?: Maybe<Category>;
    category_not?: Maybe<Category>;
    category_in?: Maybe<Category[] | Category>;
    category_not_in?: Maybe<Category[] | Category>;
    createdAt?: Maybe<DateTimeInput>;
    createdAt_not?: Maybe<DateTimeInput>;
    createdAt_in?: Maybe<DateTimeInput[] | DateTimeInput>;
    createdAt_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
    createdAt_lt?: Maybe<DateTimeInput>;
    createdAt_lte?: Maybe<DateTimeInput>;
    createdAt_gt?: Maybe<DateTimeInput>;
    createdAt_gte?: Maybe<DateTimeInput>;
    updatedAt?: Maybe<DateTimeInput>;
    updatedAt_not?: Maybe<DateTimeInput>;
    updatedAt_in?: Maybe<DateTimeInput[] | DateTimeInput>;
    updatedAt_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
    updatedAt_lt?: Maybe<DateTimeInput>;
    updatedAt_lte?: Maybe<DateTimeInput>;
    updatedAt_gt?: Maybe<DateTimeInput>;
    updatedAt_gte?: Maybe<DateTimeInput>;
    AND?: Maybe<PostScalarWhereInput[] | PostScalarWhereInput>;
    OR?: Maybe<PostScalarWhereInput[] | PostScalarWhereInput>;
    NOT?: Maybe<PostScalarWhereInput[] | PostScalarWhereInput>;
}

export interface PostUpdateManyWithWhereNestedInput {
    where: PostScalarWhereInput;
    data: PostUpdateManyDataInput;
}

export interface PostUpdateManyDataInput {
    title?: Maybe<String>;
    category?: Maybe<Category>;
}

export interface UserUpdateManyMutationInput {
    name?: Maybe<String>;
    email?: Maybe<String>;
    password?: Maybe<String>;
    role?: Maybe<UserRole>;
    refreshToken?: Maybe<String>;
}

export interface PostSubscriptionWhereInput {
    mutation_in?: Maybe<MutationType[] | MutationType>;
    updatedFields_contains?: Maybe<String>;
    updatedFields_contains_every?: Maybe<String[] | String>;
    updatedFields_contains_some?: Maybe<String[] | String>;
    node?: Maybe<PostWhereInput>;
    AND?: Maybe<PostSubscriptionWhereInput[] | PostSubscriptionWhereInput>;
    OR?: Maybe<PostSubscriptionWhereInput[] | PostSubscriptionWhereInput>;
    NOT?: Maybe<PostSubscriptionWhereInput[] | PostSubscriptionWhereInput>;
}

export interface UserSubscriptionWhereInput {
    mutation_in?: Maybe<MutationType[] | MutationType>;
    updatedFields_contains?: Maybe<String>;
    updatedFields_contains_every?: Maybe<String[] | String>;
    updatedFields_contains_some?: Maybe<String[] | String>;
    node?: Maybe<UserWhereInput>;
    AND?: Maybe<UserSubscriptionWhereInput[] | UserSubscriptionWhereInput>;
    OR?: Maybe<UserSubscriptionWhereInput[] | UserSubscriptionWhereInput>;
    NOT?: Maybe<UserSubscriptionWhereInput[] | UserSubscriptionWhereInput>;
}

export interface NodeNode {
    id: ID_Output;
}

export interface Post {
    id: ID_Output;
    title: String;
    category: Category;
    createdAt: DateTimeOutput;
    updatedAt: DateTimeOutput;
}

export interface PostPromise extends Promise<Post>, Fragmentable {
    id: () => Promise<ID_Output>;
    title: () => Promise<String>;
    category: () => Promise<Category>;
    author: <T = UserPromise>() => T;
    createdAt: () => Promise<DateTimeOutput>;
    updatedAt: () => Promise<DateTimeOutput>;
}

export interface PostSubscription
    extends Promise<AsyncIterator<Post>>,
        Fragmentable {
    id: () => Promise<AsyncIterator<ID_Output>>;
    title: () => Promise<AsyncIterator<String>>;
    category: () => Promise<AsyncIterator<Category>>;
    author: <T = UserSubscription>() => T;
    createdAt: () => Promise<AsyncIterator<DateTimeOutput>>;
    updatedAt: () => Promise<AsyncIterator<DateTimeOutput>>;
}

export interface PostNullablePromise
    extends Promise<Post | null>,
        Fragmentable {
    id: () => Promise<ID_Output>;
    title: () => Promise<String>;
    category: () => Promise<Category>;
    author: <T = UserPromise>() => T;
    createdAt: () => Promise<DateTimeOutput>;
    updatedAt: () => Promise<DateTimeOutput>;
}

export interface User {
    id: ID_Output;
    name?: String;
    email: String;
    password: String;
    role?: UserRole;
    refreshToken?: String;
    createdAt: DateTimeOutput;
    updatedAt: DateTimeOutput;
}

export interface UserPromise extends Promise<User>, Fragmentable {
    id: () => Promise<ID_Output>;
    name: () => Promise<String>;
    email: () => Promise<String>;
    password: () => Promise<String>;
    role: () => Promise<UserRole>;
    posts: <T = FragmentableArray<Post>>(args?: {
        where?: PostWhereInput;
        orderBy?: PostOrderByInput;
        skip?: Int;
        after?: String;
        before?: String;
        first?: Int;
        last?: Int;
    }) => T;
    refreshToken: () => Promise<String>;
    createdAt: () => Promise<DateTimeOutput>;
    updatedAt: () => Promise<DateTimeOutput>;
}

export interface UserSubscription
    extends Promise<AsyncIterator<User>>,
        Fragmentable {
    id: () => Promise<AsyncIterator<ID_Output>>;
    name: () => Promise<AsyncIterator<String>>;
    email: () => Promise<AsyncIterator<String>>;
    password: () => Promise<AsyncIterator<String>>;
    role: () => Promise<AsyncIterator<UserRole>>;
    posts: <T = Promise<AsyncIterator<PostSubscription>>>(args?: {
        where?: PostWhereInput;
        orderBy?: PostOrderByInput;
        skip?: Int;
        after?: String;
        before?: String;
        first?: Int;
        last?: Int;
    }) => T;
    refreshToken: () => Promise<AsyncIterator<String>>;
    createdAt: () => Promise<AsyncIterator<DateTimeOutput>>;
    updatedAt: () => Promise<AsyncIterator<DateTimeOutput>>;
}

export interface UserNullablePromise
    extends Promise<User | null>,
        Fragmentable {
    id: () => Promise<ID_Output>;
    name: () => Promise<String>;
    email: () => Promise<String>;
    password: () => Promise<String>;
    role: () => Promise<UserRole>;
    posts: <T = FragmentableArray<Post>>(args?: {
        where?: PostWhereInput;
        orderBy?: PostOrderByInput;
        skip?: Int;
        after?: String;
        before?: String;
        first?: Int;
        last?: Int;
    }) => T;
    refreshToken: () => Promise<String>;
    createdAt: () => Promise<DateTimeOutput>;
    updatedAt: () => Promise<DateTimeOutput>;
}

export interface PostConnection {
    pageInfo: PageInfo;
    edges: PostEdge[];
}

export interface PostConnectionPromise
    extends Promise<PostConnection>,
        Fragmentable {
    pageInfo: <T = PageInfoPromise>() => T;
    edges: <T = FragmentableArray<PostEdge>>() => T;
    aggregate: <T = AggregatePostPromise>() => T;
}

export interface PostConnectionSubscription
    extends Promise<AsyncIterator<PostConnection>>,
        Fragmentable {
    pageInfo: <T = PageInfoSubscription>() => T;
    edges: <T = Promise<AsyncIterator<PostEdgeSubscription>>>() => T;
    aggregate: <T = AggregatePostSubscription>() => T;
}

export interface PageInfo {
    hasNextPage: Boolean;
    hasPreviousPage: Boolean;
    startCursor?: String;
    endCursor?: String;
}

export interface PageInfoPromise extends Promise<PageInfo>, Fragmentable {
    hasNextPage: () => Promise<Boolean>;
    hasPreviousPage: () => Promise<Boolean>;
    startCursor: () => Promise<String>;
    endCursor: () => Promise<String>;
}

export interface PageInfoSubscription
    extends Promise<AsyncIterator<PageInfo>>,
        Fragmentable {
    hasNextPage: () => Promise<AsyncIterator<Boolean>>;
    hasPreviousPage: () => Promise<AsyncIterator<Boolean>>;
    startCursor: () => Promise<AsyncIterator<String>>;
    endCursor: () => Promise<AsyncIterator<String>>;
}

export interface PostEdge {
    node: Post;
    cursor: String;
}

export interface PostEdgePromise extends Promise<PostEdge>, Fragmentable {
    node: <T = PostPromise>() => T;
    cursor: () => Promise<String>;
}

export interface PostEdgeSubscription
    extends Promise<AsyncIterator<PostEdge>>,
        Fragmentable {
    node: <T = PostSubscription>() => T;
    cursor: () => Promise<AsyncIterator<String>>;
}

export interface AggregatePost {
    count: Int;
}

export interface AggregatePostPromise
    extends Promise<AggregatePost>,
        Fragmentable {
    count: () => Promise<Int>;
}

export interface AggregatePostSubscription
    extends Promise<AsyncIterator<AggregatePost>>,
        Fragmentable {
    count: () => Promise<AsyncIterator<Int>>;
}

export interface UserConnection {
    pageInfo: PageInfo;
    edges: UserEdge[];
}

export interface UserConnectionPromise
    extends Promise<UserConnection>,
        Fragmentable {
    pageInfo: <T = PageInfoPromise>() => T;
    edges: <T = FragmentableArray<UserEdge>>() => T;
    aggregate: <T = AggregateUserPromise>() => T;
}

export interface UserConnectionSubscription
    extends Promise<AsyncIterator<UserConnection>>,
        Fragmentable {
    pageInfo: <T = PageInfoSubscription>() => T;
    edges: <T = Promise<AsyncIterator<UserEdgeSubscription>>>() => T;
    aggregate: <T = AggregateUserSubscription>() => T;
}

export interface UserEdge {
    node: User;
    cursor: String;
}

export interface UserEdgePromise extends Promise<UserEdge>, Fragmentable {
    node: <T = UserPromise>() => T;
    cursor: () => Promise<String>;
}

export interface UserEdgeSubscription
    extends Promise<AsyncIterator<UserEdge>>,
        Fragmentable {
    node: <T = UserSubscription>() => T;
    cursor: () => Promise<AsyncIterator<String>>;
}

export interface AggregateUser {
    count: Int;
}

export interface AggregateUserPromise
    extends Promise<AggregateUser>,
        Fragmentable {
    count: () => Promise<Int>;
}

export interface AggregateUserSubscription
    extends Promise<AsyncIterator<AggregateUser>>,
        Fragmentable {
    count: () => Promise<AsyncIterator<Int>>;
}

export interface BatchPayload {
    count: Long;
}

export interface BatchPayloadPromise
    extends Promise<BatchPayload>,
        Fragmentable {
    count: () => Promise<Long>;
}

export interface BatchPayloadSubscription
    extends Promise<AsyncIterator<BatchPayload>>,
        Fragmentable {
    count: () => Promise<AsyncIterator<Long>>;
}

export interface PostSubscriptionPayload {
    mutation: MutationType;
    node: Post;
    updatedFields: String[];
    previousValues: PostPreviousValues;
}

export interface PostSubscriptionPayloadPromise
    extends Promise<PostSubscriptionPayload>,
        Fragmentable {
    mutation: () => Promise<MutationType>;
    node: <T = PostPromise>() => T;
    updatedFields: () => Promise<String[]>;
    previousValues: <T = PostPreviousValuesPromise>() => T;
}

export interface PostSubscriptionPayloadSubscription
    extends Promise<AsyncIterator<PostSubscriptionPayload>>,
        Fragmentable {
    mutation: () => Promise<AsyncIterator<MutationType>>;
    node: <T = PostSubscription>() => T;
    updatedFields: () => Promise<AsyncIterator<String[]>>;
    previousValues: <T = PostPreviousValuesSubscription>() => T;
}

export interface PostPreviousValues {
    id: ID_Output;
    title: String;
    category: Category;
    createdAt: DateTimeOutput;
    updatedAt: DateTimeOutput;
}

export interface PostPreviousValuesPromise
    extends Promise<PostPreviousValues>,
        Fragmentable {
    id: () => Promise<ID_Output>;
    title: () => Promise<String>;
    category: () => Promise<Category>;
    createdAt: () => Promise<DateTimeOutput>;
    updatedAt: () => Promise<DateTimeOutput>;
}

export interface PostPreviousValuesSubscription
    extends Promise<AsyncIterator<PostPreviousValues>>,
        Fragmentable {
    id: () => Promise<AsyncIterator<ID_Output>>;
    title: () => Promise<AsyncIterator<String>>;
    category: () => Promise<AsyncIterator<Category>>;
    createdAt: () => Promise<AsyncIterator<DateTimeOutput>>;
    updatedAt: () => Promise<AsyncIterator<DateTimeOutput>>;
}

export interface UserSubscriptionPayload {
    mutation: MutationType;
    node: User;
    updatedFields: String[];
    previousValues: UserPreviousValues;
}

export interface UserSubscriptionPayloadPromise
    extends Promise<UserSubscriptionPayload>,
        Fragmentable {
    mutation: () => Promise<MutationType>;
    node: <T = UserPromise>() => T;
    updatedFields: () => Promise<String[]>;
    previousValues: <T = UserPreviousValuesPromise>() => T;
}

export interface UserSubscriptionPayloadSubscription
    extends Promise<AsyncIterator<UserSubscriptionPayload>>,
        Fragmentable {
    mutation: () => Promise<AsyncIterator<MutationType>>;
    node: <T = UserSubscription>() => T;
    updatedFields: () => Promise<AsyncIterator<String[]>>;
    previousValues: <T = UserPreviousValuesSubscription>() => T;
}

export interface UserPreviousValues {
    id: ID_Output;
    name?: String;
    email: String;
    password: String;
    role?: UserRole;
    refreshToken?: String;
    createdAt: DateTimeOutput;
    updatedAt: DateTimeOutput;
}

export interface UserPreviousValuesPromise
    extends Promise<UserPreviousValues>,
        Fragmentable {
    id: () => Promise<ID_Output>;
    name: () => Promise<String>;
    email: () => Promise<String>;
    password: () => Promise<String>;
    role: () => Promise<UserRole>;
    refreshToken: () => Promise<String>;
    createdAt: () => Promise<DateTimeOutput>;
    updatedAt: () => Promise<DateTimeOutput>;
}

export interface UserPreviousValuesSubscription
    extends Promise<AsyncIterator<UserPreviousValues>>,
        Fragmentable {
    id: () => Promise<AsyncIterator<ID_Output>>;
    name: () => Promise<AsyncIterator<String>>;
    email: () => Promise<AsyncIterator<String>>;
    password: () => Promise<AsyncIterator<String>>;
    role: () => Promise<AsyncIterator<UserRole>>;
    refreshToken: () => Promise<AsyncIterator<String>>;
    createdAt: () => Promise<AsyncIterator<DateTimeOutput>>;
    updatedAt: () => Promise<AsyncIterator<DateTimeOutput>>;
}

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number;
export type ID_Output = string;

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string;

/*
DateTime scalar input type, allowing Date
*/
export type DateTimeInput = Date | string;

/*
DateTime scalar output type, which is always a string
*/
export type DateTimeOutput = string;

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.
*/
export type Int = number;

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean;

export type Long = string;

/**
 * Model Metadata
 */

export const models: Model[] = [
    {
        name: 'User',
        embedded: false,
    },
    {
        name: 'UserRole',
        embedded: false,
    },
    {
        name: 'Post',
        embedded: false,
    },
    {
        name: 'Category',
        embedded: false,
    },
];

/**
 * Type Defs
 */

export const Prisma = makePrismaClientClass<ClientConstructor<Prisma>>({
    typeDefs,
    models,
    endpoint: `${process.env['PRISMA_GQL_ENDPOINT']}`,
});
export const prisma = new Prisma();
