import axios from 'axios';
import Config from '../config';
import { Session } from 'bc-react-session';

const session = Session.get();
const authToken = (session.name && session.name.payload && session.name.payload.admin) ? session.name.payload.token : null;
const headers = {
  'Authorization': `Bearer ${authToken}`,
  'Content-Type': `application/json`
};

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
}

export default UserRolesService;
