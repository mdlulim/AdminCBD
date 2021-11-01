import axios from 'axios';
import Config from '../config';
import { Session } from 'bc-react-session';

const session   = Session.get();
const authToken = (session.payload.user) ? session.payload.token: null;
const headers   = {'Authorization': `Bearer ${authToken}`} ;

class AuthService {

    static async login(username, password, device, geoinfo){

        const apiURL = Config.API.BASE_URL_LOGIN;
        console.log(apiURL+'/login',{"user":username, "password":password, "device":device, "geoinfo": geoinfo})
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

    static async getUsers(){

    }
    static async logout() {
        // remove user from local storage to log user out bPDg2i
        Session.destroy();
    }
}
export default AuthService;
