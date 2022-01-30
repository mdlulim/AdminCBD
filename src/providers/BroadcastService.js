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

class BroadcastService {
    static async get(id=null) {
        return await axios({
          mode: 'no-cors',
          method: 'GET',
          headers: headers,
          url: `${Config.API.BASE_URL}/broadcast${id!==null?'?id='+id:''}`,
        }).then(json => json.data)
        .then(res => {
          const { success, data } = res;
          if (success) {
            return data || [];
          }
          return [];
        });
      }

      static async update(id, data) {
        return await axios({
          mode: 'no-cors',
          method: 'PUT',
          data,
          headers: headers,
          url: `${Config.API.BASE_URL}/broadcast/${id}`,
        }).then(json => json.data)
        .then(res => {
          return res;
        });
      }

      static async create(data) {
        return await axios({
          mode: 'no-cors',
          method: 'POST',
          headers: headers,
          data,
          url: `${Config.API.BASE_URL}/broadcast`,
        })
      }

      static async getAudience() {
        return await axios({
          mode: 'no-cors',
          method: 'GET',
          headers: headers,
          url: `${Config.API.BASE_URL}/audience?channel=frontend`,
        }).then(json => json.data)
        .then(res => {
          const { success, data } = res;
          if (success) {
            return data || [];
          }
          return [];
        });
      }
}

export default BroadcastService;
