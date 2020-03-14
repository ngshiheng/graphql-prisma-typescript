// Code generated by Prisma (prisma@1.34.10). DO NOT EDIT.
// Please don't change this file manually but run `prisma generate` to update it.
// For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

export const typeDefs = /* GraphQL */ `
    type AggregatePost {
        count: Int!
    }

    type AggregateUser {
        count: Int!
    }

    type BatchPayload {
        count: Long!
    }

    enum Category {
        CAREER
        EDUCATION
        FINANCE
        FITNESS
        FOOD
        GAMING
        HEALTH
        NATURE
        OTHER
        PETS
        SPORTS
        TECHNOLOGY
    }

    scalar DateTime

    scalar Long

    type Mutation {
        createPost(data: PostCreateInput!): Post!
        updatePost(data: PostUpdateInput!, where: PostWhereUniqueInput!): Post
        updateManyPosts(
            data: PostUpdateManyMutationInput!
            where: PostWhereInput
        ): BatchPayload!
        upsertPost(
            where: PostWhereUniqueInput!
            create: PostCreateInput!
            update: PostUpdateInput!
        ): Post!
        deletePost(where: PostWhereUniqueInput!): Post
        deleteManyPosts(where: PostWhereInput): BatchPayload!
        createUser(data: UserCreateInput!): User!
        updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
        updateManyUsers(
            data: UserUpdateManyMutationInput!
            where: UserWhereInput
        ): BatchPayload!
        upsertUser(
            where: UserWhereUniqueInput!
            create: UserCreateInput!
            update: UserUpdateInput!
        ): User!
        deleteUser(where: UserWhereUniqueInput!): User
        deleteManyUsers(where: UserWhereInput): BatchPayload!
    }

    enum MutationType {
        CREATED
        UPDATED
        DELETED
    }

    interface Node {
        id: ID!
    }

    type PageInfo {
        hasNextPage: Boolean!
        hasPreviousPage: Boolean!
        startCursor: String
        endCursor: String
    }

    type Post {
        id: ID!
        title: String!
        category: Category!
        author: User!
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    type PostConnection {
        pageInfo: PageInfo!
        edges: [PostEdge]!
        aggregate: AggregatePost!
    }

    input PostCreateInput {
        id: ID
        title: String!
        category: Category
        author: UserCreateOneWithoutPostsInput!
    }

    input PostCreateManyWithoutAuthorInput {
        create: [PostCreateWithoutAuthorInput!]
        connect: [PostWhereUniqueInput!]
    }

    input PostCreateWithoutAuthorInput {
        id: ID
        title: String!
        category: Category
    }

    type PostEdge {
        node: Post!
        cursor: String!
    }

    enum PostOrderByInput {
        id_ASC
        id_DESC
        title_ASC
        title_DESC
        category_ASC
        category_DESC
        createdAt_ASC
        createdAt_DESC
        updatedAt_ASC
        updatedAt_DESC
    }

    type PostPreviousValues {
        id: ID!
        title: String!
        category: Category!
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    input PostScalarWhereInput {
        id: ID
        id_not: ID
        id_in: [ID!]
        id_not_in: [ID!]
        id_lt: ID
        id_lte: ID
        id_gt: ID
        id_gte: ID
        id_contains: ID
        id_not_contains: ID
        id_starts_with: ID
        id_not_starts_with: ID
        id_ends_with: ID
        id_not_ends_with: ID
        title: String
        title_not: String
        title_in: [String!]
        title_not_in: [String!]
        title_lt: String
        title_lte: String
        title_gt: String
        title_gte: String
        title_contains: String
        title_not_contains: String
        title_starts_with: String
        title_not_starts_with: String
        title_ends_with: String
        title_not_ends_with: String
        category: Category
        category_not: Category
        category_in: [Category!]
        category_not_in: [Category!]
        createdAt: DateTime
        createdAt_not: DateTime
        createdAt_in: [DateTime!]
        createdAt_not_in: [DateTime!]
        createdAt_lt: DateTime
        createdAt_lte: DateTime
        createdAt_gt: DateTime
        createdAt_gte: DateTime
        updatedAt: DateTime
        updatedAt_not: DateTime
        updatedAt_in: [DateTime!]
        updatedAt_not_in: [DateTime!]
        updatedAt_lt: DateTime
        updatedAt_lte: DateTime
        updatedAt_gt: DateTime
        updatedAt_gte: DateTime
        AND: [PostScalarWhereInput!]
        OR: [PostScalarWhereInput!]
        NOT: [PostScalarWhereInput!]
    }

    type PostSubscriptionPayload {
        mutation: MutationType!
        node: Post
        updatedFields: [String!]
        previousValues: PostPreviousValues
    }

    input PostSubscriptionWhereInput {
        mutation_in: [MutationType!]
        updatedFields_contains: String
        updatedFields_contains_every: [String!]
        updatedFields_contains_some: [String!]
        node: PostWhereInput
        AND: [PostSubscriptionWhereInput!]
        OR: [PostSubscriptionWhereInput!]
        NOT: [PostSubscriptionWhereInput!]
    }

    input PostUpdateInput {
        title: String
        category: Category
        author: UserUpdateOneRequiredWithoutPostsInput
    }

    input PostUpdateManyDataInput {
        title: String
        category: Category
    }

    input PostUpdateManyMutationInput {
        title: String
        category: Category
    }

    input PostUpdateManyWithoutAuthorInput {
        create: [PostCreateWithoutAuthorInput!]
        delete: [PostWhereUniqueInput!]
        connect: [PostWhereUniqueInput!]
        set: [PostWhereUniqueInput!]
        disconnect: [PostWhereUniqueInput!]
        update: [PostUpdateWithWhereUniqueWithoutAuthorInput!]
        upsert: [PostUpsertWithWhereUniqueWithoutAuthorInput!]
        deleteMany: [PostScalarWhereInput!]
        updateMany: [PostUpdateManyWithWhereNestedInput!]
    }

    input PostUpdateManyWithWhereNestedInput {
        where: PostScalarWhereInput!
        data: PostUpdateManyDataInput!
    }

    input PostUpdateWithoutAuthorDataInput {
        title: String
        category: Category
    }

    input PostUpdateWithWhereUniqueWithoutAuthorInput {
        where: PostWhereUniqueInput!
        data: PostUpdateWithoutAuthorDataInput!
    }

    input PostUpsertWithWhereUniqueWithoutAuthorInput {
        where: PostWhereUniqueInput!
        update: PostUpdateWithoutAuthorDataInput!
        create: PostCreateWithoutAuthorInput!
    }

    input PostWhereInput {
        id: ID
        id_not: ID
        id_in: [ID!]
        id_not_in: [ID!]
        id_lt: ID
        id_lte: ID
        id_gt: ID
        id_gte: ID
        id_contains: ID
        id_not_contains: ID
        id_starts_with: ID
        id_not_starts_with: ID
        id_ends_with: ID
        id_not_ends_with: ID
        title: String
        title_not: String
        title_in: [String!]
        title_not_in: [String!]
        title_lt: String
        title_lte: String
        title_gt: String
        title_gte: String
        title_contains: String
        title_not_contains: String
        title_starts_with: String
        title_not_starts_with: String
        title_ends_with: String
        title_not_ends_with: String
        category: Category
        category_not: Category
        category_in: [Category!]
        category_not_in: [Category!]
        author: UserWhereInput
        createdAt: DateTime
        createdAt_not: DateTime
        createdAt_in: [DateTime!]
        createdAt_not_in: [DateTime!]
        createdAt_lt: DateTime
        createdAt_lte: DateTime
        createdAt_gt: DateTime
        createdAt_gte: DateTime
        updatedAt: DateTime
        updatedAt_not: DateTime
        updatedAt_in: [DateTime!]
        updatedAt_not_in: [DateTime!]
        updatedAt_lt: DateTime
        updatedAt_lte: DateTime
        updatedAt_gt: DateTime
        updatedAt_gte: DateTime
        AND: [PostWhereInput!]
        OR: [PostWhereInput!]
        NOT: [PostWhereInput!]
    }

    input PostWhereUniqueInput {
        id: ID
    }

    type Query {
        post(where: PostWhereUniqueInput!): Post
        posts(
            where: PostWhereInput
            orderBy: PostOrderByInput
            skip: Int
            after: String
            before: String
            first: Int
            last: Int
        ): [Post]!
        postsConnection(
            where: PostWhereInput
            orderBy: PostOrderByInput
            skip: Int
            after: String
            before: String
            first: Int
            last: Int
        ): PostConnection!
        user(where: UserWhereUniqueInput!): User
        users(
            where: UserWhereInput
            orderBy: UserOrderByInput
            skip: Int
            after: String
            before: String
            first: Int
            last: Int
        ): [User]!
        usersConnection(
            where: UserWhereInput
            orderBy: UserOrderByInput
            skip: Int
            after: String
            before: String
            first: Int
            last: Int
        ): UserConnection!
        node(id: ID!): Node
    }

    type Subscription {
        post(where: PostSubscriptionWhereInput): PostSubscriptionPayload
        user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
    }

    type User {
        id: ID!
        name: String
        email: String!
        password: String!
        role: UserRole
        posts(
            where: PostWhereInput
            orderBy: PostOrderByInput
            skip: Int
            after: String
            before: String
            first: Int
            last: Int
        ): [Post!]
        refreshToken: String
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    type UserConnection {
        pageInfo: PageInfo!
        edges: [UserEdge]!
        aggregate: AggregateUser!
    }

    input UserCreateInput {
        id: ID
        name: String
        email: String!
        password: String!
        role: UserRole
        posts: PostCreateManyWithoutAuthorInput
        refreshToken: String
    }

    input UserCreateOneWithoutPostsInput {
        create: UserCreateWithoutPostsInput
        connect: UserWhereUniqueInput
    }

    input UserCreateWithoutPostsInput {
        id: ID
        name: String
        email: String!
        password: String!
        role: UserRole
        refreshToken: String
    }

    type UserEdge {
        node: User!
        cursor: String!
    }

    enum UserOrderByInput {
        id_ASC
        id_DESC
        name_ASC
        name_DESC
        email_ASC
        email_DESC
        password_ASC
        password_DESC
        role_ASC
        role_DESC
        refreshToken_ASC
        refreshToken_DESC
        createdAt_ASC
        createdAt_DESC
        updatedAt_ASC
        updatedAt_DESC
    }

    type UserPreviousValues {
        id: ID!
        name: String
        email: String!
        password: String!
        role: UserRole
        refreshToken: String
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    enum UserRole {
        ADMIN
        USER
    }

    type UserSubscriptionPayload {
        mutation: MutationType!
        node: User
        updatedFields: [String!]
        previousValues: UserPreviousValues
    }

    input UserSubscriptionWhereInput {
        mutation_in: [MutationType!]
        updatedFields_contains: String
        updatedFields_contains_every: [String!]
        updatedFields_contains_some: [String!]
        node: UserWhereInput
        AND: [UserSubscriptionWhereInput!]
        OR: [UserSubscriptionWhereInput!]
        NOT: [UserSubscriptionWhereInput!]
    }

    input UserUpdateInput {
        name: String
        email: String
        password: String
        role: UserRole
        posts: PostUpdateManyWithoutAuthorInput
        refreshToken: String
    }

    input UserUpdateManyMutationInput {
        name: String
        email: String
        password: String
        role: UserRole
        refreshToken: String
    }

    input UserUpdateOneRequiredWithoutPostsInput {
        create: UserCreateWithoutPostsInput
        update: UserUpdateWithoutPostsDataInput
        upsert: UserUpsertWithoutPostsInput
        connect: UserWhereUniqueInput
    }

    input UserUpdateWithoutPostsDataInput {
        name: String
        email: String
        password: String
        role: UserRole
        refreshToken: String
    }

    input UserUpsertWithoutPostsInput {
        update: UserUpdateWithoutPostsDataInput!
        create: UserCreateWithoutPostsInput!
    }

    input UserWhereInput {
        id: ID
        id_not: ID
        id_in: [ID!]
        id_not_in: [ID!]
        id_lt: ID
        id_lte: ID
        id_gt: ID
        id_gte: ID
        id_contains: ID
        id_not_contains: ID
        id_starts_with: ID
        id_not_starts_with: ID
        id_ends_with: ID
        id_not_ends_with: ID
        name: String
        name_not: String
        name_in: [String!]
        name_not_in: [String!]
        name_lt: String
        name_lte: String
        name_gt: String
        name_gte: String
        name_contains: String
        name_not_contains: String
        name_starts_with: String
        name_not_starts_with: String
        name_ends_with: String
        name_not_ends_with: String
        email: String
        email_not: String
        email_in: [String!]
        email_not_in: [String!]
        email_lt: String
        email_lte: String
        email_gt: String
        email_gte: String
        email_contains: String
        email_not_contains: String
        email_starts_with: String
        email_not_starts_with: String
        email_ends_with: String
        email_not_ends_with: String
        password: String
        password_not: String
        password_in: [String!]
        password_not_in: [String!]
        password_lt: String
        password_lte: String
        password_gt: String
        password_gte: String
        password_contains: String
        password_not_contains: String
        password_starts_with: String
        password_not_starts_with: String
        password_ends_with: String
        password_not_ends_with: String
        role: UserRole
        role_not: UserRole
        role_in: [UserRole!]
        role_not_in: [UserRole!]
        posts_every: PostWhereInput
        posts_some: PostWhereInput
        posts_none: PostWhereInput
        refreshToken: String
        refreshToken_not: String
        refreshToken_in: [String!]
        refreshToken_not_in: [String!]
        refreshToken_lt: String
        refreshToken_lte: String
        refreshToken_gt: String
        refreshToken_gte: String
        refreshToken_contains: String
        refreshToken_not_contains: String
        refreshToken_starts_with: String
        refreshToken_not_starts_with: String
        refreshToken_ends_with: String
        refreshToken_not_ends_with: String
        createdAt: DateTime
        createdAt_not: DateTime
        createdAt_in: [DateTime!]
        createdAt_not_in: [DateTime!]
        createdAt_lt: DateTime
        createdAt_lte: DateTime
        createdAt_gt: DateTime
        createdAt_gte: DateTime
        updatedAt: DateTime
        updatedAt_not: DateTime
        updatedAt_in: [DateTime!]
        updatedAt_not_in: [DateTime!]
        updatedAt_lt: DateTime
        updatedAt_lte: DateTime
        updatedAt_gt: DateTime
        updatedAt_gte: DateTime
        AND: [UserWhereInput!]
        OR: [UserWhereInput!]
        NOT: [UserWhereInput!]
    }

    input UserWhereUniqueInput {
        id: ID
        email: String
    }
`;
