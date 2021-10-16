import Cookies from 'js-cookie';
import config from '../config';

class SessionProvider {
    static cookiename = config.auth.cookie.name || 'Ben';
    static start(token) {
        this.destroy();
        this.set(token);
    }

    static destroy() {
        Cookies.remove(this.cookiename);
    }

    static set(jwt, expires = config.auth.cookie.expires) {
        Cookies.set(this.cookiename, jwt, { expires });
    }

    static get() {
        const jwt = Cookies.get(this.cookiename);
        let session;
        try {
            if (jwt) {
                const base64Url = jwt.split('.')[1];
                const base64 = base64Url.replace('-', '+').replace('_', '/');
                session = JSON.parse(window.atob(base64));
            }
        } catch (error) {
            console.log(error);
        }
        return session;
    }

    static isValid() {
        const jwt = Cookies.get(this.cookiename);
        return (jwt);
    }

    // return the token from the session storage
    static getToken() {
        return Cookies.get(this.cookiename) || null;
    }
}

export default SessionProvider;
