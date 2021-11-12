import axios from 'axios';
import Config from '../config';
import { Session } from 'bc-react-session';

const session = Session.get();
const authToken = (session.name && session.name.payload && session.name.payload.admin) ? session.name.payload.token : null;
const headers = {
  'Authorization': `Bearer ${authToken}`,
  'Content-Type': `application/json`,
  'Access-Control-Max-Age': `600`
};  

console.log(authToken);

class PagePermissionService {

    static async getPagePermissions() {
      return await axios({
        mode: 'no-cors',
        method: 'GET',
        headers: headers,
        url: `${Config.API.BASE_URL}/page_permissions`,
      });
    }

    static async addPagePermission(data){
        return await axios({
          mode: 'no-cors',
          method: 'POST',
          headers: headers,
          data:data,
          url: `${Config.API.BASE_URL}/page_permission`,
        }).then((res) =>{
          const result = res;
          return result;
        });
      }

      static async updatePagePermission(id, data){
        // console.log(id);
        return await axios({
          mode: 'no-cors',
          method: 'PUT',
          headers: headers,
          data:data,
          url: `${Config.API.BASE_URL}/page_permissions/${id}`,
        }).then((res) =>{
          console.log(res);
          // const result = res;
          // return result;
        });
      }

    static async getUser(id) {
      return await axios({
        mode: 'no-cors',
        method: 'GET',
        headers: headers,
        url: `${Config.API.BASE_URL}/admin/users/${id}`,
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
}

export default PagePermissionService;
