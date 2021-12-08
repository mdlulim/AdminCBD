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

class AccountService {

    static async getMainAccount() {
      return await axios({
        mode: 'no-cors',
        method: 'GET',
        headers: headers,
        url: `${Config.API.BASE_URL}/business-account`,
      });
    }

    static async getAccountByID(id) {
      return await axios({
        mode: 'no-cors',
        method: 'GET',
        headers: headers,
        url: `${Config.API.BASE_URL}/account/${id}`,
      });
    }
}

export default AccountService;
