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
    'Authorization': `Bearer ${authToken}`,
    'Content-Type': 'application/json',
  }
}

class CompanyBankAccountService {

    static async getCompanyBankAccounts() {
      return await axios({
        mode: 'no-cors',
        method: 'GET',
        headers: headers,
        url: `${Config.API.BASE_URL}/company-bank-accounts`,
      }).then(json => json.data)
      .then(res => {
        const { success, data } = res;
        if (success) {
          return data || [];
        }
        return [];
      })
    }

    static async createCompanyBankAccount(data){
      return await axios({
        mode: 'no-cors',
        method: 'POST',
        headers: headers,
        data:data,
        url: `${Config.API.BASE_URL}/company-bank-accounts`,
      }).then((res) =>{
        const result = res;
        return result;
      });
    }

    static async getCompanyBankAccount(id) {
      return await axios({
        mode: 'no-cors',
        method: 'GET',
        headers: headers,
        url: `${Config.API.BASE_URL}/company-bank-accounts/${id}`,
      });
    }

    static async updateCompanyBankAccount(id,bank){
      return await axios({
          mode: 'no-cors',
          method: 'PUT',
          data: bank,
          headers: headers,
          url: `${Config.API.BASE_URL}/company-bank-accounts/${id}`,
      }).then((res) =>{
        return res;
      });
    }

}

export default CompanyBankAccountService;
