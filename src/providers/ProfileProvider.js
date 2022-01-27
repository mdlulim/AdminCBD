import axios from 'axios';
import config from '../config';
import SessionProvider from './SessionProvider';

const baseurl = config.API.BASE_URL_PROFILE;
const authToken = SessionProvider.getToken();
let headers = {
    'Content-Type': 'application/json'
};

if (SessionProvider.isValid()) {
    headers = {
        'Authorization'   : `Bearer ${authToken}`,
        'Content-Type'    : 'application/json',
        'X-Frame-Options' : 'SAMEORIGIN',
        'X-XSS-Protection': 1,
        'X-Content-Type-Options': 'nosniff',
    }
}

class ProfileProvider {
    static async me() {
        return await axios({
            mode: 'no-cors',
            method: 'GET',
            url: `${baseurl}profile`,
            crossdomain: true,
            headers,
        })
            .then((json) => json.data)
            .then(res => res.data)
            .catch((err) => {
                if (err.response) return err.response.data;
                return err;
            });
    };

    static async update(data) {
        return await axios({
            mode: 'no-cors',
            method: 'PUT',
            url: `${baseurl}profile`,
            crossdomain: true,
            data,
            headers,
        })
            .then((json) => json.data)
            .then(res => res)
            .catch((err) => {
                if (err.response) return err.response.data;
                return err;
            });
    };
}

export default ProfileProvider;