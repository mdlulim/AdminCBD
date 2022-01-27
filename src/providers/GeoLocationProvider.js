import axios from 'axios';
import Config from '../config';

const { url } = Config.API.BASE_URL_GEOAPI;

class GeoLocationProvider {
    static async get() {
        return await axios({
            mode: 'no-cors',
            method: 'GET',
            url,
        })
        .then(res => res.data)
        .catch(err => err);
    }
}

export default GeoLocationProvider;
