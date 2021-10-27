import axios from 'axios';
import Config from '../config';
import { Session } from 'bc-react-session';

const session = Session.get();
const authToken = (session.payload.user) ? session.payload.token : null;
const headers = {
  'Authorization': `Bearer ${authToken}`,
  'Content-Type': `application/json`
};

class CurrencyService {

    static async getCurrencies() {
      return await axios({
        mode: 'no-cors',
        method: 'GET',
        headers: headers,
        url: `${Config.API.BASE_URL}/admin/countries`,
      });
    }

    static async getCurrency(id) {
      return await axios({
        mode: 'no-cors',
        method: 'GET',
        headers: headers,
        url: `${Config.API.BASE_URL}/admin/countries/${id}`,
      });
    }
}

export default CurrencyService;
