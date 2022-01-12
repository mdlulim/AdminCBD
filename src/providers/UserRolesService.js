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

class UserRolesService {

  static async getUserRoles() {
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      headers: headers,
      url: `${Config.API.BASE_URL}/groups`,
    });
  }

  static async addUserRoles(data){
    return await axios({
      mode: 'no-cors',
      method: 'POST',
      headers: headers,
      data:data,
      url: `${Config.API.BASE_URL}/groups`,
    }).then((res) =>{
      const result = res;
      return result;
    });
  }

  static async updateUserRoles(id,data){
    return await axios({
      mode: 'no-cors',
      method: 'PUT',
      headers: headers,
      data:data,
      url: `${Config.API.BASE_URL}/groups/${id}`,
    }).then((res) =>{
      const result = res;
      return result;
    });
  }

  static async getUserRole(id) {
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      headers: headers,
      url: `${Config.API.BASE_URL}/admin/groups/${id}`,
    });
  }

  static async archiveRole(id) {
    return await axios({
      mode: 'no-cors',
      method: 'PUT',
      headers: headers,
      url: `${Config.API.BASE_URL}/groups/${id}/archive`,
    });
  }
}

export default UserRolesService;
