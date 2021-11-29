var Config = {};
Config.STAGE = process.ENV ? process.ENV : 'dev';
Config.API = {
    BASE_URL: 'https://dev.cbiglobal.io/v1/admin',
    BASE_URL_POP: 'https://dev.cbiglobal.io/v1/file-storage/file',
    BASE_URL_LOGIN: 'https://dev.cbiglobal.io/v1/auth',
};

export default Config;
