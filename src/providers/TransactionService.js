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
      }).then(json => json.data)
      .then(res => {
        const { success, data } = res;
        if (success) {
          return data || [];
        }
        return [];
      })
    }

    static async getTransactionBatchFiles() {
      return await axios({
        mode: 'no-cors',
        method: 'GET',
        headers: headers,
        url: `${Config.API.BASE_URL_FILE_STORAGE}/batch-get`,
      });
    }

    static async getUsers() {
      return await axios({
        mode: 'no-cors',
        method: 'GET',
        headers: headers,
        url: `${Config.API.BASE_URL}/users`,
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

    static async updateTransactionStatus(id,data){
        return await axios({
          mode: 'no-cors',
          method: 'PUT',
          data: data,
          headers: headers,
          url: `${Config.API.BASE_URL}/transactions/${id}`,
        }).then((res) =>{
          const result = res;
          return result;
        });
    }

    static async approveDeposit(id,data){
      return await axios({
        mode: 'no-cors',
        method: 'PUT',
        data: data,
        headers: headers,
        url: `${Config.API.BASE_URL}/users/${id}/transactions/deposit`,
      }).then((res) =>{
        const result = res;
        return result;
      });
  }

    static async getMemberTransactions(id) {
      return await axios({
        mode: 'no-cors',
        method: 'GET',
        headers: headers,
        url: `${Config.API.BASE_URL}/users/${id}/transactions`,
      });
    }

    static async getTransactionPOP(txid) {
      return await axios({
        mode: 'no-cors',
        method: 'GET',
        headers: headers,
        url: `${Config.API.BASE_URL}/pop/deposits/${txid}`,
      }).then(json => json.data)
      .then(res => {
        const { success, data } = res;
        if (success) {
          return data || [];
        }
        return [];
      })
    }
      static async getTransactionPOPFile(url) {
        return await axios({
          mode: 'no-cors',
          method: 'GET',
          headers: headers,
          url: `${Config.API.BASE_URL_POP}?filename=${url}`,
        });
      }

}

export default TransactionService;
