import axios from 'axios';
import Config from '../config';
import SessionProvider from './SessionProvider';

const authToken = SessionProvider.getToken();
let headers = {
  'Content-Type': 'application/json'
};

if (SessionProvider.isValid()) {
  headers = {
    'Authorization': `Bearer ${authToken}`,
    'Content-Type': 'application/json',
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

}

export default KYCService;
