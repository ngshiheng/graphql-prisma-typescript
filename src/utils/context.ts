import { Post } from '@entities/Post.entity';
import { User } from '@entities/User.entity';
import { Prisma } from '@generated/prisma-client';
import { Request } from 'express';

export interface Context {
    prisma: Prisma;
    request: Request;
    Post: Post;
    User: User;
}
