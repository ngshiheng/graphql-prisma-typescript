export const APP_SECRET: string = process.env.SECRET!;

export const TOKEN_EXPIRY: string = process.env.EXPIRY!;

export const MAXIMUM_COMPLEXITY: number = 100;

export const MAXIMUM_SEED: number = 5;

export const SALT_ROUND: number = 10; // Hide this for actual usage

export const DEFAULT_LOGIN_QUERY = `# Enter your email and password to login to receive your access token
mutation {
    login(email: "", password: "") {
        token
        user {
            id
        }
    }
}

# Replace <paste access token here> with your access token
# Paste the authorization header below in the 'HTTP HEADERS' tab at the bottom of the page for all your requests
# { "Authorization": "Bearer <paste access token here>" }
`;
