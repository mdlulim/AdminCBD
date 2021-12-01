var Config = {};
Config.STAGE = process.ENV ? process.ENV : 'dev';
Config.API = {
    BASE_URL: 'https://dev.cbiglobal.io/v1/admin',
    BASE_URL_POP: 'https://dev.cbiglobal.io/v1/storage/file',
    BASE_URL_LOGIN: 'https://dev.cbiglobal.io/v1/auth',
};

export default Config;

//https://dev.cbiglobal.io/v1/storage/file?filename=pop/deposit/3c3035f6-eafa-4e80-afb8-3f3450f719b5/1637397485456.pdf
//https://dev.cbiglobal.io/v1/storage/file?filename=pop/deposit/3c3035f6-eafa-4e80-afb8-3f3450f719b5/1637397485456.pdf
