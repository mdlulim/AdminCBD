import axios from 'axios';
import Config from '../config';
import SessionProvider from './SessionProvider';

const authToken = SessionProvider.getToken();
let headers = {
  'Content-Type': 'application/json'
};

if (SessionProvider.isValid()) {
  headers = {
      'Authorization'         : `Bearer ${authToken}`,
      'Content-Type'          : 'application/json',
      'Access-Control-Max-Age': `600`,
      'X-Frame-Options'       : 'SAMEORIGIN',
      'X-XSS-Protection'      : 1,
      'X-Content-Type-Options': 'nosniff',
  }
}

class PermissionLevelService {

    static async getLevels() {
      return await axios({
        mode: 'no-cors',  
        method: 'GET',
        headers: headers,
        url: `${Config.API.BASE_URL}/levels`,
      });
    }

    static async addAdminUser(data){
        return await axios({
          mode: 'no-cors',
          method: 'POST',
          headers: headers,
          data:data,
          url: `${Config.API.BASE_URL}/users?group=admin`,
        }).then((res) =>{
          const result = res;
          return result;
        });
      }

      static async updateAdminUser(id, data){
        return await axios({
          mode: 'no-cors',
          method: 'PUT',
          headers: headers,
          data:data,
          url: `${Config.API.BASE_URL}/users/${id}`,
        }).then((res) =>{
          const result = res;
          return result;
        });
      }

    static async getUser(id) {
      return await axios({
        mode: 'no-cors',
        method: 'GET',
        headers: headers,
        url: `${Config.API.BASE_URL}/admin/users/${id}`,
      });
    }

    static async archiveUser(id) {
      return await axios({
        mode: 'no-cors',
        method: 'PUT',
        headers: headers,
        url: `${Config.API.BASE_URL}/users/${id}/archive`,
      });
    }
}

export default PermissionLevelService;
