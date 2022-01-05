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

    static async getTransactionType(subtype) {
        return await axios({
          mode: 'no-cors',
          method: 'GET',
          headers: headers,
          data: subtype,
          url: `${Config.API.BASE_URL}/transactions-type`,
        }).then((res) =>{
          const result = res;
          return result;
        });
    }

    static async getTransactionTotal(subtype) {
        return await axios({
          mode: 'no-cors',
          method: 'GET',
          headers: headers,
          data: subtype,
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
