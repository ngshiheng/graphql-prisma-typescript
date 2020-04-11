import { Context } from '@src/index';
import { ACCESS_TOKEN_SECRET } from '@utils/constants';
import { verify } from 'jsonwebtoken';
import { AuthChecker } from 'type-graphql';

export interface Session {
    userId: string;
    role: string;
    iat: number;
    exp: number;
}

export const getUserId = async ({ request }: Context) => {
    const getAuthHeader = request.headers.authorization || '';
    const token = getAuthHeader.replace('Bearer ', '');
    return verify(token, ACCESS_TOKEN_SECRET) as Session;
};

export const authenticationChecker: AuthChecker<Context> = async (
    { args, context: { request, prisma } },
    roles,
) => {
    try {
        const { userId, role } = await getUserId({ request, prisma });
        if (role === 'ADMIN') {
            return true;
        }
        // Check if the requester is an owner of the object
        if (roles.includes('OWNER')) {
            if (args.id === userId) {
                return true;
            }
            const author = await prisma.post({ id: args.id }).author();
            if (author) {
                return userId === author.id;
            } else {
                return false;
            }
        }
        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
};
