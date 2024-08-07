import axios from 'axios';
import Config from '../config';
import SessionProvider from './SessionProvider';

const baseurl =Config.API.BASE_URL_FILE_STORAGE;
const token = SessionProvider.getToken();
let headers = {
    'Content-Type': 'application/json'
};

if (SessionProvider.isValid()) {
    headers = {
        'Authorization'   : `Bearer ${token}`,
        'Content-Type'    : 'application/json',
        'X-Frame-Options' : 'SAMEORIGIN',
        'X-XSS-Protection': 1,
        'X-Content-Type-Options': 'nosniff',
      }
}

class FileStorageProvider {
    static async upload(category, type, file, filename = null) {
        const form = new FormData();
        form.append('upload', file);
        headers['Content-Type'] = file.type;
        return axios.post(`${baseurl}upload/${category}/${type}${(filename)?`?filename=${filename}`:''}`, form, {
            headers,
        })
            .then((json) => json.data)
            .then(res => res)
            .catch((err) => {
                if (err.response) return err.response.data;
                return err;
            });
    };

    static async filepath(filename) {
        return await axios({
            mode: 'no-cors',
            method: 'GET',
            url: `${baseurl}file?filename=${filename}`,
            crossdomain: true,
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

export default FileStorageProvider;