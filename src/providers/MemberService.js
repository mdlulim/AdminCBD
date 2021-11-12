import axios from 'axios';
import Config from '../config';
import { Session } from 'bc-react-session';

const session = Session.get();
const authToken = (session.name && session.name.payload && session.name.payload.admin) ? session.name.payload.token : null;
const headers = {
  'Authorization': `Bearer ${authToken}`,
  'Content-Type': `application/json`
};

class MemberService {

  static async getMembers() {
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

  static async getMemberKYC(id) {
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      headers: headers,
      url: `${Config.API.BASE_URL}/users/${id}/kyc`,
    });
  }

  static async updateMemberKYC(id) {
    return await axios({
      mode: 'no-cors',
      method: 'PUT',
      headers: headers,
      url: `${Config.API.BASE_URL}/users/${id}/kyc`,
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

  //Get member referels
  static async getMemberWallet(id) {
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      headers: headers,
      url: `${Config.API.BASE_URL}/users/${id}/wallet`,
    });
  }

  //Get member bank details
  static async getMemberBankDetails(id) {
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      headers: headers,
      url: `${Config.API.BASE_URL}/users/${id}/bank_accounts`,
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

}

export default MemberService;
