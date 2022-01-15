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

class SettingService {

    static async getSettings() {
      return await axios({
        mode: 'no-cors',
        method: 'GET',
        headers: headers,
        url: `${Config.API.BASE_URL}/settings`,
      });
    }

    static async getSettingsCommission() {
      return await axios({
        mode: 'no-cors',
        method: 'GET',
        headers: headers,
        url: `${Config.API.BASE_URL}/settings/commission`,
      }).then(json => json.data)
      .then(res => {
        const { success, data } = res;
        if (success) {
          return data || [];
        }
        return [];
      })
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

      static async destroySetting(id){
        return await axios({
          mode: 'no-cors',
          method: 'DELETE',
          headers: headers,
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
