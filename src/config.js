var Config = {};
if (process.env.NODE_ENV === 'production') {
    Config.STAGE = process.env.NODE_ENV;
    Config.API = {
        BASE_URL: 'https://api.cbiglobal.io/v1/admin',
        BASE_URL_POP: 'https://api.cbiglobal.io/v1/storage/file',
        BASE_URL_LOGIN: 'https://api.cbiglobal.io/v1/auth',
    }
} else if (process.env.NODE_ENV === 'qa') {
    Config.STAGE = process.env.NODE_ENV;
    Config.API = {
        BASE_URL: 'https://dev.qa.cbiglobal.io/v1/admin',
        BASE_URL_POP: 'https://dev.qa.cbiglobal.io/v1/storage/file',
        BASE_URL_LOGIN: 'https://dev.qa.cbiglobal.io/v1/auth',
    }
}   else if (process.env.NODE_ENV === 'develop') {
        Config.STAGE = process.env.NODE_ENV;
        Config.API = {
            BASE_URL: 'https://dev.cbiglobal.io/v1/admin',
            BASE_URL_POP: 'https://dev.cbiglobal.io/v1/storage/file',
            BASE_URL_LOGIN: 'https://dev.cbiglobal.io/v1/auth',
        }
}   else {
        Config.STAGE = process.env.NODE_ENV;
        Config.API = {
            BASE_URL: 'http://localhost:8000',
            BASE_URL_POP: 'http://localhost:8090',
            BASE_URL_LOGIN: 'http://localhost:8080',
    }
}

export default Config;
