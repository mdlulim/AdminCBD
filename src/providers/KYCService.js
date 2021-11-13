import axios from 'axios';
import Config from '../config';
import { Session } from 'bc-react-session';

const session = Session.get();
const authToken = (session.name && session.name.payload && session.name.payload.admin) ? session.name.payload.token : null;
const headers = {
  'Authorization': `Bearer ${authToken}`,
  'Content-Type': `application/json`
};

class KYCService {

  static async getKYCApplicants() {
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      headers: headers,
      url: `${Config.API.BASE_URL}/users?group=member`,
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
