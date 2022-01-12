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

class KYCService {

  static async getKYCApplicants() {
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      headers: headers,
      url: `${Config.API.BASE_URL}/all-kyc/`,
    });
  }

  static async getKYC(id) {
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      headers: headers,
      url: `${Config.API.BASE_URL}/users/kyc?id=${id}`,
    });
  }

  static async updateKYC(data) {
    return await axios({
      mode: 'no-cors',
      method: 'PUT',
      headers: headers,
      data: data,
      url: `${Config.API.BASE_URL}/kyc`,
    }).then((res) => {
      const result = res;
      return result;
    });
  }

  static async getkycLlevel(id) {
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      headers: headers,
      url: `${Config.API.BASE_URL}/kyc-level/${id}`,
    }).then((res) => {
      const result = res;
      return result;
    });
  }

  static async getKYCLimits() {
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      headers: headers,
      url: `${Config.API.BASE_URL}/kyc-limits`,
    }).then(json => json.data)
    .then(res => {
      const { success, data } = res;
      if (success) {
        return data || [];
      }
      return [];
    });
  }

  static async updateKYCLimit(id,data){
    return await axios({
        mode: 'no-cors',
        method: 'PUT',
        data: data,
        headers: headers,
        url: `${Config.API.BASE_URL}/kyc-limits/${id}`,
    }).then((res) =>{
      return res;
    });
  }

}

export default KYCService;
