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

class MemberService {

  static async getMembers() {
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      headers: headers,
<<<<<<< HEAD
      url: `${Config.API.BASE_URL}/admin/members`,
=======
      url: `${Config.API.BASE_URL}/users?group=member`,
    });
  }

  static async getWealthCreaters() {
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      headers: headers,
      url: `${Config.API.BASE_URL}/users?group=wealth-creator`,
>>>>>>> 56a330f8ccd24c9a8d84cd7acc3857e01a462e5a
    });
  }

  static async getMember(id) {
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      headers: headers,
<<<<<<< HEAD
      url: `${Config.API.BASE_URL}/admin/members/${id}`,
    });
  }
=======
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

  //Get member referels
  static async getMemberReferrals(id) {
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      headers: headers,
      url: `${Config.API.BASE_URL}/users/${id}/referrals`,
    });
  }

  static async updateStatus(id,status){
    if(status === 'Blocked'){
      return await axios({
        mode: 'no-cors',
        method: 'PUT',
        headers: headers,
        url: `${Config.API.BASE_URL}/users/${id}/block`,
      }).then((res) =>{
        const result = res;
        return result;
      });
    }else if(status === 'Archived'){
      return await axios({
        mode: 'no-cors',
        method: 'PUT',
        headers: headers,
        url: `${Config.API.BASE_URL}/users/${id}/archive`,
      }).then((res) =>{
        console.log(res);
        //const result = {status: res.data.status, message: res.data.message}
        const result = res;
        return result;
      }); }else if(status === 'Active'){
      return await axios({
        mode: 'no-cors',
        method: 'PUT',
        headers: headers,
        url: `${Config.API.BASE_URL}/users/${id}/unblock`,
      }).then((res) =>{
        const result = res; //{status: res.data.status, message: res.data.message}
        return result;
    });
  }
}

>>>>>>> 56a330f8ccd24c9a8d84cd7acc3857e01a462e5a
}

export default MemberService;
