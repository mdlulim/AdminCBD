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

class ProductService {
  static async getProducts() {
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      headers: headers,
      url: `${Config.API.BASE_URL}/products`,
    }).then(json => json.data)
    .then(res => {
      const { success, data } = res;
      if (success) {
        return data || [];
      }
      return [];
    })
  }

  static async getProductCancellations() {
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      headers: headers,
      url: `${Config.API.BASE_URL}/products/cancellations`,
    }).then(json => json.data)
    .then(res => {
      const { success, data } = res;
      if (success) {
        return data || [];
      }
      return [];
    })
  }

  static async updateCancellationRequest(type, data) {
    return await axios({
      mode: 'no-cors',
      method: 'POST',
      headers: headers,
      url: `${Config.API.BASE_URL}/products/cancellations/${type}`,
      data,
    })
      .then(json => json.data)
      .then(res => res);
  }

  static async getProductHistory() {
    //console.log(authToken)
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      headers: headers,
      url: `${Config.API.BASE_URL}/products/history`,
    }).then(json => json.data)
    .then(res => {
      const { success, data } = res;
      if (success) {
        return data || [];
      }
      return [];
    })
  }

  static async getProductCategories() {
    console.log(authToken)
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      headers: headers,
      url: `${Config.API.BASE_URL}/products/categories`,
    });
  }

  static async getProductCategory(id) {
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      headers: headers,
      url: `${Config.API.BASE_URL}/products/categories/${id}`,
    });
  }

  static async getProduct(id) {
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      headers: headers,
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

  static async getMembersByPoducts(id) {
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      headers: headers,
      url: `${Config.API.BASE_URL}/products/${id}/users`,
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

  static async addProduct(data){
    return await axios({
      mode: 'no-cors',
      method: 'POST',
      headers: headers,
      data:data,
      url: `${Config.API.BASE_URL}/products`,
    }).then((res) =>{
      const result = res;
      return result;
    });
  }

  static async addProductCategory(data){
    return await axios({
      mode: 'no-cors',
      method: 'POST',
      headers: headers,
      data:data,
      url: `${Config.API.BASE_URL}/products/categories`,
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
      url: `${Config.API.BASE_URL}/products/${id}`,
    }).then((res) =>{
      const result = {status: res.data.status, message: res.data.message}
      return result;
    });
  }

}
export default ProductService;
