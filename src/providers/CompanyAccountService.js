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

class TransactionService {

    static async getTransactions() {
      return await axios({
        mode: 'no-cors',
        method: 'GET',
        headers: headers,
        url: `${Config.API.BASE_URL}/transactions`,
      });
    }

    static async getTransaction(id) {
      return await axios({
        mode: 'no-cors',
        method: 'GET',
        headers: headers,
        url: `${Config.API.BASE_URL}/transactions/${id}`,
      });
    }
    static async updateStatus(id,status){
      if(status === 'Canceled'){
        return await axios({
          mode: 'no-cors',
          method: 'PUT',
          headers: headers,
          url: `${Config.API.BASE_URL}/transactions/${id}/canceled`,
        }).then((res) =>{
          const result = res;
          return result;
        });
      }else if(status === 'Complete'){
        return await axios({
          mode: 'no-cors',
          method: 'PUT',
          headers: headers,
          url: `${Config.API.BASE_URL}/transactions/${id}/completed`,
        }).then((res) =>{
          const result = res;
          return result;
        });
      }
    }

    static async getMemberTransactions(id) {
      return await axios({
        mode: 'no-cors',
        method: 'GET',
        headers: headers,
        url: `${Config.API.BASE_URL}/users/${id}/transactions`,
      });
    }

}

export default TransactionService;