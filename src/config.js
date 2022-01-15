var Config = {};
let stage = 'local'
if (window.location) {
    var arr = window.location.hostname.split('.');
    if (arr[0] !== 'localhost') {
        stage = arr[1];
        if (stage === 'cbiglobal') {
            Config.STAGE = 'development';
        } else if (stage === 'qa') {
            Config.STAGE = 'qa';
        } else if (stage === 'release') {
            Config.STAGE = 'release';
        }else {
            Config.STAGE = 'production';
        }
    }
}
Config.auth = {
    cookie: {
        name: '__cbiWebAppUserSession',
        expires: 1, // days
    }
}
if (Config.STAGE === 'production') {
    Config.API = {
        BASE_URL: 'https://api.cbiglobal.io/v1/admin',
        BASE_URL_POP: 'https://api.cbiglobal.io/v1/storage/file',
        BASE_URL_FILE_STORAGE:'https://dev.cbiglobal.io/v1/storage/',
        BASE_URL_LOGIN: 'https://api.cbiglobal.io/v1/auth',
    }
} else if (Config.STAGE === 'qa') {
    Config.API = {
        BASE_URL: 'https://dev.qa.cbiglobal.io/v1/admin',
        BASE_URL_POP: 'https://dev.qa.cbiglobal.io/v1/storage/file',
        BASE_URL_FILE_STORAGE:'https://dev.cbiglobal.io/v1/storage',
        BASE_URL_LOGIN: 'https://dev.qa.cbiglobal.io/v1/auth',
    }
} else if (Config.STAGE === 'development') {
    Config.API = {
        BASE_URL: 'https://dev.cbiglobal.io/v1/admin',
        BASE_URL_POP: 'https://dev.cbiglobal.io/v1/storage/file',
        BASE_URL_FILE_STORAGE:'https://dev.cbiglobal.io/v1/storage',
        BASE_URL_LOGIN: 'https://dev.cbiglobal.io/v1/auth',
    }
} else if (Config.STAGE === 'release') {
    Config.API = {
        BASE_URL: 'https://dev.release.cbiglobal.io/v1/admin',
        BASE_URL_POP: 'https://dev.release.cbiglobal.io/v1/storage/file',
        BASE_URL_FILE_STORAGE:'https://dev.cbiglobal.io/v1/storage',
        BASE_URL_LOGIN: 'https://dev.release.cbiglobal.io/v1/auth',
    }
}else {
    Config.STAGE = 'local'
    Config.API = {
        BASE_URL: 'https://dev.cbiglobal.io/v1/admin',
        BASE_URL_POP: 'https://dev.cbiglobal.io/v1/storage/file',
        BASE_URL_FILE_STORAGE:'https://dev.cbiglobal.io/v1/storage',
        BASE_URL_BATCH: 'http://localhost:8020',
        BASE_URL_LOGIN: 'https://dev.release.cbiglobal.io/v1/auth',
    }
}

export default Config;
