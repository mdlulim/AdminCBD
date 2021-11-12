import axios from 'axios';
import Config from '../config';
import { Session } from 'bc-react-session';

const session = Session.get();
const authToken = (session.name && session.name.payload && session.name.payload.admin) ? session.name.payload.token : null;
const headers = {
  'Authorization': `Bearer ${authToken}`,
  'Content-Type': `application/json`
};

class ProductService {

  static async getProducts() {
    console.log(authToken)
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      headers: headers,
      url: `http://localhost:8090/products`,
    });
  }

  static async getProductCategories() {
    console.log(authToken)
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      headers: headers,
      url: `http://localhost:8090/products/categories`,
    });
  }

  static async getProduct(id) {
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      headers: headers,
      url: `http://localhost:8090/products/${id}`,
    });
  }

  static async getProductByMemberId(id) {
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      headers: headers,
      url: `http://localhost:8090/users/${id}/products`,
    });
  }

  static async getMembersByPoducts(id) {
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      headers: headers,
      url: `http://localhost:8090/products/${id}/users`,
    });
  }

  static async getProductByMemberId(id) {
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      headers: headers,
      url: `http://localhost:8090/users/${id}/products`,
    });
  }

  static async addProduct(data){
    return await axios({
      mode: 'no-cors',
      method: 'POST',
      headers: headers,
      data:data,
      url: `http://localhost:8090/products`,
    }).then((res) =>{
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
      url: `http://localhost:8090/products/${id}`,
    }).then((res) =>{
      const result = {status: res.data.status, message: res.data.message}
      return result;
    });
  }

}
export default ProductService;
