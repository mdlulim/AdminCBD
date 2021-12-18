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

class SettingService {

    static async getSettings() {
      return await axios({
        mode: 'no-cors',
        method: 'GET',
        headers: headers,
        url: `${Config.API.BASE_URL}/settings`,
      });
    }

    static async createSetting(data){
        return await axios({
          mode: 'no-cors',
          method: 'POST',
          headers: headers,
          data:data,
          url: `${Config.API.BASE_URL}/settings`,
        }).then((res) =>{
          const result = res;
          return result;
        });
      }

      static async updateSetting(id, data){
        return await axios({
          mode: 'no-cors',
          method: 'PUT',
          headers: headers,
          data:data,
          url: `${Config.API.BASE_URL}/settings/${id}`,
        }).then((res) =>{
          const result = res;
          return result;
        });
      }

    static async getSetting(id) {
      return await axios({
        mode: 'no-cors',
        method: 'GET',
        headers: headers,
        url: `${Config.API.BASE_URL}/settings/${id}`,
      });
    }
}

export default SettingService;
