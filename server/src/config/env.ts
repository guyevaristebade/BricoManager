const env = {
    port: process.env.PORT || 3000,
    tokens: {
        accessSecret: process.env.ACCESS_TOKEN_SECRET!,
        accessExpireIn: process.env.ACCESS_TOKEN_EXPIRE!,
        refreshSecret: process.env.REFRESH_TOKEN_SECRET!,
        refreshExpireIn: process.env.REFRESH_TOKEN_EXPIRE!,
    },
    cloudinary: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
        api_key: process.env.CLOUDINARY_API_KEY!,
        api_secret: process.env.CLOUDINARY_API_SECRET!,
    },
};

export default env;
