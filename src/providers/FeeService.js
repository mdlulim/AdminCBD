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

class FeeService {

    static async getFees() {
      return await axios({
        mode: 'no-cors',
        method: 'GET',
        headers: headers,
        url: `${Config.API.BASE_URL}/fees`,
      }).then(json => json.data)
      .then(res => {
        const { success, data } = res;
        if (success) {
          return data || [];
        }
        return [];
      })
    }

    static async createFee(data){
        return await axios({
          mode: 'no-cors',
          method: 'POST',
          headers: headers,
          data:data,
          url: `${Config.API.BASE_URL}/fees`,
        }).then((res) =>{
          const result = res;
          return result;
        });
      }

      static async updateFee(id, data){
        return await axios({
          mode: 'no-cors',
          method: 'PUT',
          headers: headers,
          data:data,
          url: `${Config.API.BASE_URL}/fees/${id}`,
        }).then((res) =>{
          const result = res;
          return result;
        });
      }

    static async getFee(id) {
      return await axios({
        mode: 'no-cors',
        method: 'GET',
        headers: headers,
        url: `${Config.API.BASE_URL}/fees/${id}`,
      });
    }
}

export default FeeService;
