var Config = {};
Config.STAGE = process.ENV ? process.ENV : 'dev';
Config.API = {
    BASE_URL: 'http://admin-service:8080',
    BASE_URL_LOGIN: 'http://auth-service:8080',
};

export default Config;
