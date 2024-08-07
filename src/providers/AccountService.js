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

class AccountService {

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

    static async getAccountByID(id) {
      return await axios({
        mode: 'no-cors',
        method: 'GET',
        headers: headers,
        url: `${Config.API.BASE_URL}/account/${id}`,
      }).then(json => json.data)
      .then(res => {
        const { success, data } = res;
        if (success) {
          return data || [];
        }
        return [];
      });
    }

    static async debitCredit(data){
      return await axios({
        mode: 'no-cors',
        method: 'POST',
        headers: headers,
        data:data,
        url: `${Config.API.BASE_URL}/transfer`,
      }).then((res) =>{
        const result = res;
        return result;
      });
    }

    static async debitCreditHistory() {
      return await axios({
        mode: 'no-cors',
        method: 'GET',
        headers: headers,
        url: `${Config.API.BASE_URL}/transfer-history`,
      }).then(json => json.data)
      .then(res => {
        const { success, data } = res;
        if (res.success) {
          return res.response.data.response || [];
        }
        return [];
      });
    }
}
export default AccountService;
