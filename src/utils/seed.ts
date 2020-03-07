import { Category } from '@entities/Post.entity';
import { UserRole } from '@entities/User.entity';
import { prisma } from '@generated/prisma-client';
import { DUMMY_PASSWORD, MAXIMUM_SEED, SALT_ROUNDS } from '@utils/constants';
import { hash } from 'bcryptjs';
import { company, internet, name } from 'faker';
import { sample } from 'lodash';
import 'reflect-metadata';

export const databaseSeed = async () => {
    // Create 5 random users
    let userCount: number = 0;
    while (userCount < MAXIMUM_SEED) {
        let hashedPassword = await hash(DUMMY_PASSWORD, SALT_ROUNDS);
        await prisma.createUser({
            name: name.findName(),
            email: internet.email(),
            password: hashedPassword,
            role: sample(Object.values(UserRole)),
        });
        userCount++;
    }

    // For each of the 5 users, create a 2 posts
    const users = await prisma.users({ last: MAXIMUM_SEED });
    let postCount: number = 0;
    for (const user of users) {
        while (postCount < 3) {
            await prisma.createPost({
                category: sample(Object.values(Category)),
                title: company.catchPhrase(),
                author: { connect: { id: user.id } },
            });
            postCount++;
        }
        postCount = 0;
    }
};

databaseSeed();
