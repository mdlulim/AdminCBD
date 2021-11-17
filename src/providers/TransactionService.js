import axios from 'axios';
import Config from '../config';
import { Session } from 'bc-react-session';

const session = Session.get();
const authToken = (session.name && session.name.payload && session.name.payload.admin) ? session.name.payload.token : null;
const headers = {
  'Authorization': `Bearer ${authToken}`,
  'Content-Type': `application/json`
};

class TransactionService {

    static async getTransactions() {
      return await axios({
        mode: 'no-cors',
        method: 'GET',
        headers: headers,
        url: `${Config.API.BASE_URL}/transactions`,
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
      });
    }

}

export default TransactionService;
