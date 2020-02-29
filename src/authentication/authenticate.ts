import { Context } from 'graphql-yoga/dist/types';
import { verify } from 'jsonwebtoken';
import { AuthChecker } from 'type-graphql';
import { APP_SECRET } from '../utils/constants';

export const authenticationChecker: AuthChecker = (
    { args, context: { request } }: Context,
    roles,
) => {
    const getAuthHeader = request.get('Authorization');
    if (getAuthHeader) {
        const token = getAuthHeader.replace('Bearer ', '');
        const { userId, role }: any = verify(token, APP_SECRET);

        if (roles.includes('OWNER')) {
            return args.id === userId || role === 'ADMIN';
        }

        switch (role) {
            case 'ADMIN':
                return true;

            case 'USER':
                return roles.includes(role);

            default:
                return false;
        }
    }
    return false;
};
