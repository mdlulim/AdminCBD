import axios from 'axios';
import Config from '../config';
import SessionProvider from './SessionProvider';

const authToken = SessionProvider.getToken();
let headers = {
  'Content-Type': 'application/json'
};

if (SessionProvider.isValid()) {
  headers = {
    'Authorization': `Bearer ${authToken}`,
    'Content-Type': 'application/json',
  }
}

class CurrencyService {

    static async getCurrencies() {
      return await axios({
        mode: 'no-cors',
        method: 'GET',
        headers: headers,
        url: `${Config.API.BASE_URL}/currencies`,
      });
    }

    static async getCurrency(id) {
      return await axios({
        mode: 'no-cors',
        method: 'GET',
        headers: headers,
        url: `${Config.API.BASE_URL}/currencies/${id}`,
      });
    }
}

export default CurrencyService;
