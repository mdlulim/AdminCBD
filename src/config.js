var Config = {};
Config.STAGE = process.ENV ? process.ENV : 'dev';
Config.API = {
    BASE_URL: 'https://dev.cbiglobal.io/v1',
    BASE_URL_LOGIN: 'https://dev.cbiglobal.io/v1/auth',
};

export default Config;