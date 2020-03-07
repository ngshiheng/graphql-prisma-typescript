import { authenticationChecker } from '@authentication/authenticate';
import { prisma } from '@generated/prisma-client';
import { DEFAULT_LOGIN_QUERY, MAXIMUM_COMPLEXITY } from '@utils/constants';
import { GraphQLError } from 'graphql';
import queryComplexity, {
    fieldExtensionsEstimator,
    simpleEstimator,
} from 'graphql-query-complexity';
import { GraphQLServer } from 'graphql-yoga';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import path = require('path');

const main = async () => {
    const schema = await buildSchema({
        resolvers: [__dirname + '/resolvers/**/*.{ts,js}'],
        authChecker: authenticationChecker,
        emitSchemaFile: path.resolve(__dirname, 'schema/schema.gql'),
    });

    const server = new GraphQLServer({
        schema,
        context: request => {
            return {
                ...request,
                prisma,
            };
        },
    });

    const options = {
        port: process.env.PORT,
        endpoint: process.env.ENDPOINT,
        playground: process.env.ENDPOINT,
        defaultPlaygroundQuery: DEFAULT_LOGIN_QUERY,
        validationRules: [
            queryComplexity({
                maximumComplexity: MAXIMUM_COMPLEXITY,
                variables: {},
                createError: (max: number, actual: number) => {
                    return new GraphQLError(
                        `Query is too complex: ${actual}. Maximum allowed complexity: ${max}`,
                    );
                },
                estimators: [
                    fieldExtensionsEstimator(),
                    simpleEstimator({
                        defaultComplexity: 1,
                    }),
                ],
            }),
        ],
    } as any;

    server.start(options, () =>
        console.log(
            `🚀 Server is running on http://localhost:${process.env.PORT}${process.env.ENDPOINT}`,
        ),
    );
};

main();
