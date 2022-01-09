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

class MemberService {

  static async getMembers() {
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      headers: headers,
      url: `${Config.API.BASE_URL}/users?group=member`,
    }).then(json => json.data)
    .then(res => {
      const { success, data } = res;
      if (success) {
        return data || [];
      }
      return [];
    })
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
    }).then(json => json.data)
    .then(res => {
      const { success, data } = res;
      if (success) {
        return data || [];
      }
      return [];
    })
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
    }).then(json => json.data)
    .then(res => {
      const { success, data } = res;
      if (success) {
        return data || [];
      }
      return [];
    })
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
    }).then(json => json.data)
    .then(res => {
      const { success, data } = res;
      if (success) {
        return data || [];
      }
      return [];
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

  //Update member bank details
  static async updateMemberBankDetails(id, data) {
    return await axios({
      mode: 'no-cors',
      method: 'PUT',
      headers: headers,
      data,
      url: `${Config.API.BASE_URL}/bank_accounts/${id}`,
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
    }else if(status === 'Archive'){
      return await axios({
        mode: 'no-cors',
        method: 'PUT',
        headers: headers,
        url: `${Config.API.BASE_URL}/users/${id}/archive`,
      }).then((res) =>{
       // console.log(res);
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
