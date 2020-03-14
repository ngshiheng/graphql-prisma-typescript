import { APP_SECRET } from '@utils/constants';
import { Context } from '@utils/context';
import { verify } from 'jsonwebtoken';
import { AuthChecker } from 'type-graphql';

export const authenticationChecker: AuthChecker<Context> = async (
    { args, context: { request, prisma } },
    roles,
) => {
    const getAuthHeader = request.headers.authorization;
    if (getAuthHeader) {
        const token = getAuthHeader.replace('Bearer ', '');
        const { userId, role }: any = verify(token, APP_SECRET);
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
            }
            return false;
        }
    }
    return false;
};
