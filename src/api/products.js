import axios from 'axios';

export const getProducts = (_page = 1) => {
  return axios.get(`http://localhost:4000/productItems`, {
    params: {
      _page,
      _limit: 5,
      _order: 'desc',
      _sort: 'score'
    }
  });
};
// axios 에서 2번째 파라미터를 params 객체로 넣어줌으로써 json 조절.

export const getAllProducts = () =>
  axios.get(`http://localhost:4000/productItems`);

export const getAllCoupons = () => axios.get(`http://localhost:4000/coupons`);
