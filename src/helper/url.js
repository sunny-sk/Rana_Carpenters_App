const BASE_URL = 'https://ranacarpenters.herokuapp.com';
// const BASE_URL = 'http://192.168.43.150:4100';

export default {
  _imageBase:
    'https://res.cloudinary.com/smarty123/image/upload/c_thumb,w_1000,g_face/',
  _inventoryBase:
    'https://res.cloudinary.com/smarty123/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/',

  // _inventoryBase:
  //   'https://res.cloudinary.com/smarty123/image/upload/c_thumb,w_1000,g_face/v1586713045/',
  _login: BASE_URL + '/api/v1/auth/signin',
  _register: BASE_URL + '/api/v1/auth/signup',
  _getAllProducts: BASE_URL + '/api/v1/products',
  _getAllCategories: BASE_URL + '/api/v1/category',
  _getDetails: BASE_URL + '/api/v1/details',
};
