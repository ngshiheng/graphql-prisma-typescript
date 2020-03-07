import { PageInfo } from '@entities/PageInfo';
import { PostConnection } from '@entities/Post.entity';
import 'reflect-metadata';
import {
    Field,
    ID,
    InputType,
    Int,
    ObjectType,
    registerEnumType,
} from 'type-graphql';

@ObjectType({ description: 'User model' })
export class User {
    @Field(() => ID, { description: 'Unique ID of the user' })
    id: string;

    @Field({ nullable: true, description: 'Name of the user' })
    name?: string;

    @Field({ description: 'Email of the user' })
    email: string;

    @Field(() => UserRole, { description: 'Role of the user' })
    role: UserRole;

    @Field(() => PostConnection, { description: 'Posts authored by the user' })
    posts: PostConnection;

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
export class UserCreateInput implements Partial<User> {
    @Field()
    email: string;

    @Field()
    password: string;

    @Field({ nullable: true })
    name?: string;

    @Field(() => UserRole)
    role: UserRole;
}

@InputType({ description: 'User update inputs' })
export class UserUpdateInput implements Partial<User> {
    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    email?: string;
}

@ObjectType({ description: 'Connections between nodes' })
export class UserEdge {
    @Field({ description: 'Data of the User object' })
    node: User;

    @Field({ description: 'Cursor used for users pagination' })
    cursor: string;
}

@ObjectType()
export class UserConnection {
    @Field(() => [UserEdge])
    edges: UserEdge[];

    @Field()
    pageInfo: PageInfo;

    @Field(() => Int)
    totalCount: number;
}

export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
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
