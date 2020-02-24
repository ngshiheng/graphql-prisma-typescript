import { Field, ID, InputType, ObjectType } from 'type-graphql';

@ObjectType({ description: 'The user model' })
export class User {
    @Field(() => ID, { description: 'The unique ID of the user ' })
    id: string;

    @Field({ description: 'The email of the user' })
    email: string;

    @Field({ description: 'The email of the user' })
    password: string;

    @Field({ description: 'The date which of the user is created' })
    createdAt: string;

    @Field({ description: 'The date which of the user is last updated' })
    updatedAt: string;
}

@ObjectType()
export class AuthPayload {
    @Field()
    token: string;

    @Field()
    user: User;
}

@InputType()
export class UserUpdateInput {
    @Field()
    email: string;
}

@ObjectType()
export class UserEdge {
    @Field()
    node: User;

    @Field()
    cursor: String;
}

@ObjectType()
export class PageInfo {
    @Field()
    hasNextPage: Boolean;

    @Field()
    hasPreviousPage: Boolean;

    @Field()
    startCursor: String;

    @Field()
    endCursor: String;
}

@ObjectType()
export class UserConnection {
    @Field(() => [UserEdge])
    edges: UserEdge[];

    @Field()
    pageInfo: PageInfo;

    @Field()
    totalCount: Number;
}
