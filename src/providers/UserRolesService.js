import axios from 'axios';
import Config from '../config';
import { Session } from 'bc-react-session';

const session = Session.get();
<<<<<<< HEAD
const authToken = (session.payload.user) ? session.payload.token : null;
const headers = {
  'Authorization': `Bearer ${authToken}`
=======
const authToken = (session.name && session.name.payload && session.name.payload.admin) ? session.name.payload.token : null;
const headers = {
  'Authorization': `Bearer ${authToken}`,
  'Content-Type': `application/json`
>>>>>>> 56a330f8ccd24c9a8d84cd7acc3857e01a462e5a
};

class UserRolesService {

  static async getUserRoles() {
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      headers: headers,
      url: `${Config.API.BASE_URL}/admin/groups`,
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
