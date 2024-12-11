import dotenv from 'dotenv';

const envFile = process.env.NODE_ENV === 'production' ? '.env_prod' : '.env_devel';
dotenv.config({ path: envFile });

export default {
    PORT: process.env.PORT || 4000,
    SECRET: process.env.SECRET || 'default_secret',

    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/defaultDB',

    MYSQL_HOST: process.env.MYSQL_HOST || 'localhost',
    MYSQL_PORT: process.env.MYSQL_PORT || 3306,
    MYSQL_USER: process.env.MYSQL_USER || 'root',
    MYSQL_PASS: process.env.MYSQL_PASS || '',
    MYSQL_DB: process.env.MYSQL_DB || 'defaultDB',

    PERSISTENCE: process.env.PERSISTENCE || 'mongodb',

    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID || '',
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET || '',
    GITHUB_CALLBACK: process.env.GITHUB_CALLBACK || 'http://localhost:4000/api/users/githubcallback',
};