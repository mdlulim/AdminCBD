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
    'X-Frame-Options': 'SAMEORIGIN',
    'X-XSS-Protection': 1,
    'X-Content-Type-Options': 'nosniff',
  }
}

class UserService {

  static async getUsers() {
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      headers: headers,
      url: `${Config.API.BASE_URL}/users?group=admin`,
    })
      .then((json) => json.data)
      .then(res => res.data)
      .catch((err) => {
        if (err.response) return err.response.data;
        return err;
      });
  }

  static async getUsersall() {
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      headers: headers,
      url: `${Config.API.BASE_URL}/users`,
    });
  }

  static async getUserByEmail(email) {
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      headers: headers,
      url: `${Config.API.BASE_URL}/users/email/${email}`,
    });
  }

  static async createUser(data) {
    return await axios({
      mode: 'no-cors',
      method: 'POST',
      headers: headers,
      data: data,
      url: `${Config.API.BASE_URL}/users`,
    }).then((res) => {
      const result = res.data;
      return result;
    });
  }

  static async updateUser(id, data) {
    return await axios({
      mode: 'no-cors',
      method: 'PUT',
      headers: headers,
      data: data,
      url: `${Config.API.BASE_URL}/users/${id}`,
    }).then((res) => {
      const result = res.data;
      return result;
    });
  }

  static async getUser(id) {
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      headers: headers,
      url: `${Config.API.BASE_URL}/users/${id}`,
    })
      .then((json) => json.data)
      .then(res => res.data)
      .catch((err) => {
        if (err.response) return err.response.data;
        return err;
      });
  }

  static async archiveUser(id) {
    return await axios({
      mode: 'no-cors',
      method: 'PUT',
      headers: headers,
      url: `${Config.API.BASE_URL}/users/${id}/archive`,
    });
  }

  static async getRoles() {
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      headers: headers,
      url: `${Config.API.BASE_URL}/groups?channel=admin`,
    })
      .then((json) => json.data)
      .then(res => res.data)
      .catch((err) => {
        if (err.response) return err.response.data;
        return err;
      });
  }

  static async addRoles(data) {
    return await axios({
      mode: 'no-cors',
      method: 'POST',
      headers: headers,
      data: data,
      url: `${Config.API.BASE_URL}/groups`,
    }).then((res) => {
      const result = res;
      return result;
    });
  }

  static async updateRoles(id, data) {
    return await axios({
      mode: 'no-cors',
      method: 'PUT',
      headers: headers,
      data: data,
      url: `${Config.API.BASE_URL}/groups/${id}`,
    }).then((res) => {
      const result = res;
      return result;
    });
  }

  static async getRole(id) {
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      headers: headers,
      url: `${Config.API.BASE_URL}/groups/${id}`,
    })
      .then((json) => json.data)
      .then(res => res.data)
      .catch((err) => {
        if (err.response) return err.response.data;
        return err;
      });
  }

  static async archiveRole(id) {
    return await axios({
      mode: 'no-cors',
      method: 'PUT',
      headers: headers,
      url: `${Config.API.BASE_URL}/groups/${id}/archive`,
    });
  }

}

export default UserService;
