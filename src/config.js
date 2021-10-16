var Config = {};
Config.STAGE = process.ENV ? process.ENV : 'dev';
Config.API = {
    BASE_URL: 'http://dev.cbiglobal.io',
};

export default Config;
