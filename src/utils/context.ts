import { Post } from '@entities/Post.entity';
import { User } from '@entities/User.entity';
import { Prisma } from '@generated/prisma-client';

export interface Context {
    prisma: Prisma;
    request: any;
    Post: Post;
    User: User;
}
