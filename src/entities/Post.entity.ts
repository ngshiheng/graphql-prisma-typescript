import {
    Field,
    ID,
    InputType,
    ObjectType,
    registerEnumType,
} from 'type-graphql';
import { PageInfo } from './PageInfo';
import { User } from './User.entity';

@ObjectType({ description: 'Post model' })
export class Post {
    @Field(() => ID, { description: 'Unique ID of the post' })
    id: string;

    @Field({ description: 'Title of the post' })
    title: string;

    @Field(() => Category, { description: 'Category of the post' })
    category: string;

    @Field({ description: 'Author of the post' })
    author: User;

    @Field({ description: 'Date of which the post is created' })
    createdAt: string;

    @Field({ description: 'Date of which the post is last updated' })
    updatedAt: string;
}

@InputType({ description: 'Post creation inputs' })
export class PostCreateInput {
    @Field()
    title: string;

    @Field(() => Category)
    category: Category;
}

@InputType({ description: 'Post update inputs' })
export class PostUpdateInput {
    @Field({ nullable: true })
    title: string;

    @Field(() => Category, { nullable: true })
    category: Category;
}

@ObjectType({ description: 'Connections between nodes' })
export class PostEdge {
    @Field({ description: 'Data of the Post object' })
    node: Post;

    @Field({ description: 'Cursor used for posts pagination' })
    cursor: String;
}

@ObjectType()
export class PostConnection {
    @Field(() => [PostEdge])
    edges: PostEdge[];

    @Field()
    pageInfo: PageInfo;

    @Field()
    totalCount: Number;
}

export enum Category {
    SPORT = 'SPORT',
    FINANCE = 'FINANCE',
    TECHNOLOGY = 'TECHNOLOGY',
    OTHER = 'OTHER',
}

registerEnumType(Category, {
    name: 'PostCategory',
    description: 'Categories available for the post',
});

export enum PostOrderByInput {
    id_ASC = 'id_ASC',
    id_DESC = 'id_DESC',
    title_ASC = 'title_ASC',
    title_DESC = 'title_DESC',
    createdAt_ASC = 'createdAt_ASC',
    createdAt_DESC = 'createdAt_DESC',
    updatedAt_ASC = 'updatedAt_ASC',
    updatedAt_DESC = 'updatedAt_DESC',
}

registerEnumType(PostOrderByInput, {
    name: 'PostOrderByInput',
    description: 'Filter order by input',
});
