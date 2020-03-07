import 'reflect-metadata';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class PageInfo {
    @Field({ description: 'Check if the current query has next page' })
    hasNextPage: Boolean;

    @Field({ description: 'Check if the current query has previous page' })
    hasPreviousPage: Boolean;

    @Field({ description: 'ID of the first object of the current page' })
    startCursor: string;

    @Field({ description: 'ID of the last object of the current page' })
    endCursor: string;
}
