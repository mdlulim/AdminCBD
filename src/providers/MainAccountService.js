import axios from 'axios';
import Config from '../config';
import SessionProvider from './SessionProvider';

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

class MainAccountService {

    static async getMainAccount() {
      return await axios({
        mode: 'no-cors',
        method: 'GET',
        headers: headers,
        url: `${Config.API.BASE_URL}/business-account`,
      }).then(json => json.data)
      .then(res => {
        const { success, data } = res;
        if (success) {
          return data || [];
        }
        return [];
      });
    }

    static async getTransactionType(data) {
      return await axios({
        mode: 'no-cors',
        method: 'POST',
        headers: headers,
        data: data,
        url: `${Config.API.BASE_URL}/transactions-type`,
      }).then(json => json.data)
      .then(res => {
        const { success, data } = res;
        if (success) {
          return data || [];
        }
        return [];
      })
    }

    static async getTransactionTotal(data) {
        return await axios({
          mode: 'no-cors',
          method: 'POST',
          headers: headers,
          data: data,
          url: `${Config.API.BASE_URL}/transactions-total`,
        }).then(json => json.data)
        .then(res => {
          const { success, data } = res;
          if (success) {
            return data || [];
          }
          return [];
        })
    }

}

export default MainAccountService;