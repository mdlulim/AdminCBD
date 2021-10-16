import axios from 'axios';

class GeoLocationService {
    static async getClientLocation() {
        return await axios({
            mode: 'no-cors',
            method: 'GET',
            header: {'Access-Control-Allow-Origin': '*'},
            url: 'https://geolocation-db.com/json',
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            return err;
        })
    }
}

export default GeoLocationService;