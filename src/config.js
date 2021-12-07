var Config = {};

if (window.location) {
    var arr = window.location.hostname.split('.');
    if (arr[0] !== 'localhost') {
        stage = arr[0];
        if (stage === 'dev' || stage === 'demo') {
            Config.STAGE = 'development';
        } else if (stage === 'qa') {
            Config.STAGE = 'qa';
        } else {
            Config.STAGE = 'production';
        }
    }
}


if (Config.STAGE === 'production') {
    Config.API = {
        BASE_URL: 'https://api.cbiglobal.io/v1/admin',
        BASE_URL_POP: 'https://api.cbiglobal.io/v1/storage/file',
        BASE_URL_LOGIN: 'https://api.cbiglobal.io/v1/auth',
    }
} else if (Config.STAGE === 'qa') {
    Config.API = {
        BASE_URL: 'https://dev.qa.cbiglobal.io/v1/admin',
        BASE_URL_POP: 'https://dev.qa.cbiglobal.io/v1/storage/file',
        BASE_URL_LOGIN: 'https://dev.qa.cbiglobal.io/v1/auth',
    }
} else if (Config.STAGE === 'development') {
    Config.API = {
        BASE_URL: 'https://dev.cbiglobal.io/v1/admin',
        BASE_URL_POP: 'https://dev.cbiglobal.io/v1/storage/file',
        BASE_URL_LOGIN: 'https://dev.cbiglobal.io/v1/auth',
    }
} else {
    Config.STAGE = 'local'
    Config.API = {
        BASE_URL: 'http://localhost:8000',
        BASE_URL_POP: 'http://localhost:8090',
        BASE_URL_LOGIN: 'http://localhost:8080',
    }
}

export default Config;
