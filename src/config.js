const config = {
    JWT_SECRET: 'superSecretKeyForJWT',
    GITHUB_CLIENT_ID: 'yourGithubClientID',
    GITHUB_CLIENT_SECRET: 'yourGithubClientSecret',
    GITHUB_CALLBACK_URL: 'http://localhost:3000/api/users/ghlogin/callback',
    SESSION_SECRET: 'secretCoffeStoreSession',
    MONGO_URI: 'mongodb://localhost:27017/laCasaDelCafe',
    PORT: process.env.PORT || 3000
};

export default config;