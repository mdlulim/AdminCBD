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

class CountryService {

    static async getCountries() {
      return await axios({
        mode: 'no-cors',
        method: 'GET',
        headers: headers,
        url: `${Config.API.BASE_URL}/countries`,
      });
    }

    static async getCountry(id) {
      return await axios({
        mode: 'no-cors',
        method: 'GET',
        headers: headers,
        url: `${Config.API.BASE_URL}/countries/${id}`,
      });
    }
    static async blackListCountry(id){
      return await axios({
        mode: 'no-cors',
        method: 'PUT',
        headers: headers,
        url: `${Config.API.BASE_URL}/countries/${id}/blacklist`,
      }).then((res) =>{
        const result = res
        return result;
      });
    }

    static async unBlackListCountry(id){
      return await axios({
        mode: 'no-cors',
        method: 'PUT',
        headers: headers,
        url: `${Config.API.BASE_URL}/countries/${id}/unblacklist`,
      }).then((res) =>{
        const result = res
        return result;
      });
    }
}

export default CountryService;
