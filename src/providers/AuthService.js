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

class AuthService { 
  

    static async login(username, password, device, geoinfo){
        
        const apiURL = Config.API.BASE_URL_LOGIN;
       // console.log(apiURL+'/login',{"user":username, "password":password, "device":device, "geoinfo": geoinfo})
        const res    = await axios.post(apiURL+'/login',{"user":username, "password":password, "device":device, "geoinfo": geoinfo});
        return res;
    }

    static async addUser(user){
        return await axios({
          mode: 'no-cors',
          method: 'POST',
          data: user,
          headers: headers,
          url: `${Config.API.BASE_URL}users`,
        }).then((res) =>{
          const result = {status: res.data.status, message: res.data.message}
          return result;
        });
      }

      static async editUser(id, user){
        return await axios({
          mode: 'no-cors',
          method: 'PUT',
          data: user,
          headers: headers,
          url: `${Config.API.BASE_URL}users/${id}`,
        }).then((res) =>{
          const result = {status: res.data.status, message: res.data.message}
          return result;
        });
      }

      static async getUsers() {
        return await axios({
          mode: 'no-cors',
          method: 'GET',
          headers: headers,
          url: `${Config.API.BASE_URL}/users?group=admin`,
        });
      }

      static async resetPassword(email){
        return await axios({
          mode: 'no-cors',
          method: 'POST',
          data: email,
          headers: headers,
          url: `${Config.API.BASE_URL_LOGIN}/password/reset`,
        }).then((res) =>{
          const result = {status: res.data.status, message: res.data.message}
          return result;
        });
      }

    static async logout() {
        // remove user from local storage to log user out bPDg2i
        SessionProvider.destroy();
    }
}
export default AuthService;
