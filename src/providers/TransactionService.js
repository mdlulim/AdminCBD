import axios from 'axios';
import Config from '../config';
import { Session } from 'bc-react-session';

const session = Session.get();
const authToken = (session.payload.user) ? session.payload.token : null;
const headers = {
  'Authorization': `Bearer ${authToken}`
};

class TransactionService {

  static async getTransactions() {
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      headers: headers,
      url: `${Config.API.BASE_URL}:8082/admin/transactions`,
    });
  }

  static async getTransaction(id) {
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      headers: headers,
      url: `${Config.API.BASE_URL}:8082/admin/transactions/${id}`,
    });
  }
}

export default TransactionService;
