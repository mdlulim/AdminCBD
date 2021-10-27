import axios from 'axios';
import Config from '../config';
import { Session } from 'bc-react-session';

const session = Session.get();
const authToken = (session.payload.user) ? session.payload.token : null;
const headers = {
  'Authorization': `Bearer ${authToken}`
};

class CountryService {

    static async getCountries() {
      return await axios({
        mode: 'no-cors',
        method: 'GET',
        headers: headers,
        url: `${Config.API.BASE_URL}/admin/users`,
      });
    }

    static async getCountry(id) {
      return await axios({
        mode: 'no-cors',
        method: 'GET',
        headers: headers,
        url: `${Config.API.BASE_URL}/admin/users/${id}`,
      });
    }
}

export default CountryService;
