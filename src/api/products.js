import axios from 'axios';

export const getProducts = (_page = 1) => {
  return axios.get(`http://localhost:4001/productItems`, {
    params: {
      _page,
      _limit: 5,
      _order: 'desc',
      _sort: 'score'
    }
  });
};

export const getAllProducts = () =>
  axios.get(`http://localhost:4001/productItems`);
