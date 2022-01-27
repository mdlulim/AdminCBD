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

class ActivityService {

  static async getActivitiesByUser(id) {
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      headers: headers,
      url: `${Config.API.BASE_URL}/activities/${id}`,
    }).then(json => json.data)
    .then(res => {
      const { success, data } = res;
      if (success) {
        return data || [];
      }
      return [];
    })
  }


}

export default ActivityService;