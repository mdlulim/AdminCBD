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

class BankAccountService {

    static async getBankAccounts() {
      return await axios({
        mode: 'no-cors',
        method: 'GET',
        headers: headers,
        url: `${Config.API.BASE_URL}/bank-accounts`,
      });
    }

    static async getPendingBankAccounts() {
        return await axios({
          mode: 'no-cors',
          method: 'GET',
          headers: headers,
          url: `${Config.API.BASE_URL}/bank-accounts/pending`,
        });
      }

    static async getBankAccount(id) {
      return await axios({
        mode: 'no-cors',
        method: 'GET',
        headers: headers,
        url: `${Config.API.BASE_URL}/bank-accounts/${id}`,
      });
    }
}

export default BankAccountService;
