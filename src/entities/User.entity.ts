import {
    Field,
    ID,
    InputType,
    ObjectType,
    registerEnumType,
} from 'type-graphql';
import { PageInfo } from './PageInfo';
import { Post } from './Post.entity';

@ObjectType({ description: 'User model' })
export class User {
    @Field(() => ID, { description: 'Unique ID of the user' })
    id: string;

    @Field({ nullable: true, description: 'Name of the user' })
    name?: string;

    @Field({ description: 'Email of the user' })
    email: string;

    @Field({ description: 'Password of the user' })
    password: string;

    @Field(() => UserRole, { description: 'Role of the user' })
    role: UserRole;

    @Field(() => [Post], { description: 'Posts authored by the user' })
    posts: [Post];

    @Field({ description: 'Date of which the user is created' })
    createdAt: string;

    @Field({ description: 'Date of which the user is last updated' })
    updatedAt: string;
}

@ObjectType({ description: 'Authentication payload model' })
export class AuthPayload {
    @Field({ description: 'Token that expires after a certain period of time' })
    token: string;

    @Field({ description: 'User model' })
    user: User;
}

@InputType({ description: 'User creation inputs' })
export class UserCreateInput {
    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    password: string;

    @Field(() => UserRole)
    role: UserRole;
}

@InputType({ description: 'User update inputs' })
export class UserUpdateInput {
    @Field({ nullable: true })
    name: string;

    @Field({ nullable: true })
    email: string;
}

@ObjectType({ description: 'Connections between nodes' })
export class UserEdge {
    @Field({ description: 'Data of the User object' })
    node: User;

    @Field({ description: 'Cursor used for users pagination' })
    cursor: String;
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

export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
    VISITOR = 'VISITOR',
}

registerEnumType(UserRole, {
    name: 'UserRole',
    description: 'Roles available for users',
});

export enum UserOrderByInput {
    id_ASC = 'id_ASC',
    id_DESC = 'id_DESC',
    name_ASC = 'name_ASC',
    name_DESC = 'name_DESC',
    email_ASC = 'email_ASC',
    email_DESC = 'email_DESC',
    createdAt_ASC = 'createdAt_ASC',
    createdAt_DESC = 'createdAt_DESC',
    updatedAt_ASC = 'updatedAt_ASC',
    updatedAt_DESC = 'updatedAt_DESC',
}

registerEnumType(UserOrderByInput, {
    name: 'UserOrderByInput',
    description: 'Filter order by input',
});
