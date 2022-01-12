import axios from 'axios';
import Config from '../config';
import SessionProvider from './SessionProvider';
import {
  osName,
  osVersion,
  browserName,
  isMobile,
} from 'react-device-detect';

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

class BankAccountService {

    static async getBankAccounts() {
      return await axios({
        mode: 'no-cors',
        method: 'GET',
        headers: headers,
        url: `${Config.API.BASE_URL}/bank-accounts`,
      });
    }

    static async createBankAccount(data){
      return await axios({
        mode: 'no-cors',
        method: 'POST',
        headers: headers,
        data:data,
        url: `${Config.API.BASE_URL}/bank-accounts`,
      }).then((res) =>{
        const result = res;
        return result;
      });
    }

    static async getPendingBankAccounts() {
        console.log(authToken)
        return await axios({
          mode: 'no-cors',
          method: 'GET',
          headers: headers,
          url: `${Config.API.BASE_URL}/bank-accounts/pending`,
        });
      }

    static async getBankAccount(id) {
      return await axios({
        mode: 'no-cors',
        method: 'GET',
        headers: headers,
        url: `${Config.API.BASE_URL}/bank-accounts/${id}`,
      });
    }

    static async sendOTPBankAccount(id, data) {
        return await axios({
          mode: 'no-cors',
          method: 'POST',
          headers: headers,
          data: data,
          url: `${Config.API.BASE_URL}/bank-accounts/verify/${id}`,
        }).then((res) =>{
          const result = res;
          return result;
        });
    }

    static async otpVerify(id, data) {
      return await axios({
        mode: 'no-cors',
        method: 'POST',
        headers: headers,
        data: data,
        url: `${Config.API.BASE_URL}/bank-accounts/${id}/auth/otp/verify`,
      }).then((res) =>{
        const result = res;
        return result;
      });
  }

  static async sendOTP(id, data) {
    const device = {
      browser: browserName,
      os_name: osName,
      os_version: osVersion,
      is_mobile: isMobile,
    };
    return await axios({
      mode: 'no-cors',
      method: 'POST',
      headers: headers,
      data: {
        ...data,
        device,
      },
      url: `${Config.API.BASE_URL}/bank-accounts/${id}/auth/otp`,
    }).then((res) =>{
      const result = res;
      return result;
    });
}

static async reSendOTP(id, data) {
  return await axios({
    mode: 'no-cors',
    method: 'POST',
    headers: headers,
    data: data,
    url: `${Config.API.BASE_URL}/bank-accounts/${id}/auth/otp/resend`,
  }).then((res) =>{
    const result = res;
    return result;
  });
}
}

export default BankAccountService;
