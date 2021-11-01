import axios from 'axios';
import Config from '../config';
import { Session } from 'bc-react-session';

const session = Session.get();
<<<<<<< HEAD
const authToken = (session.payload.user) ? session.payload.token : null;
const headers = {
  'Authorization': `Bearer ${authToken}`
=======
const authToken = (session.name && session.name.payload && session.name.payload.admin) ? session.name.payload.token : null;
const headers = {
  'Authorization': `Bearer ${authToken}`,
  'Content-Type': `application/json`
>>>>>>> 56a330f8ccd24c9a8d84cd7acc3857e01a462e5a
};

class ProductService {

  static async getProducts() {
<<<<<<< HEAD
=======
    console.log(authToken)
>>>>>>> 56a330f8ccd24c9a8d84cd7acc3857e01a462e5a
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      headers: headers,
<<<<<<< HEAD
      url: `${Config.API.BASE_URL}/admin/products`,
=======
      url: `${Config.API.BASE_URL}/products`,
>>>>>>> 56a330f8ccd24c9a8d84cd7acc3857e01a462e5a
    });
  }

  static async getProduct(id) {
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      headers: headers,
<<<<<<< HEAD
      url: `${Config.API.BASE_URL}/admin/products/${id}`,
    });
  }
}

=======
      url: `${Config.API.BASE_URL}/products/${id}`,
    });
  }

  static async getProductByMemberId(id) {
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      headers: headers,
      url: `${Config.API.BASE_URL}/users/${id}/products`,
    });
  }

  static async getProductByMemberId(id) {
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      headers: headers,
      url: `${Config.API.BASE_URL}/users/${id}/products`,
    });
  }

  static async addProduct(product){
    console.log(product)
    return await axios({
      mode: 'no-cors',
      method: 'POST',
      data: product,
      headers: headers,
      url: `${Config.API.BASE_URL}/products`,
    }).then((res) =>{
      //const result = {status: res.data.status, message: res.data.message}
      const result = res;
      return result;
    });
  }

  static async updateProduct(id,product){
    return await axios({
      mode: 'no-cors',
      method: 'PUT',
      data: product,
      headers: headers,
      url: `${Config.API.BASE_URL}/products/${id}`,
    }).then((res) =>{
      const result = {status: res.data.status, message: res.data.message}
      return result;
    });
  }

}
>>>>>>> 56a330f8ccd24c9a8d84cd7acc3857e01a462e5a
export default ProductService;
