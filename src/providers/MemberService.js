import axios from 'axios';
import Config from '../config';
import { Session } from 'bc-react-session';

const session = Session.get();
const authToken = (session.name.payload.admin) ? session.name.payload.token : null;
const headers = {
  'Authorization': `Bearer ${authToken}`,
  'Content-Type': `application/json`
};

class MemberService {

  static async getMembers() {
    console.log('Token: '+authToken);
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      headers: headers,
      url: `${Config.API.BASE_URL}/users?group=member`,
    });
  }

  static async getWealthCreaters() {
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      headers: headers,
      url: `${Config.API.BASE_URL}/users?group=wealth-creator`,
    });
  }

  static async getMember(id) {
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      headers: headers,
      url: `${Config.API.BASE_URL}/users/${id}`,
    });
  }

  static async getMemberAddress(id) {
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      headers: headers,
      url: `${Config.API.BASE_URL}/users/${id}/addresses`,
    });
  }
}

export default MemberService;
