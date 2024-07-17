import axios from 'axios';

const authFetch = axios.create({
  baseURL: 'https://dummyjson.com/',
  headers: {
    Accept: 'application/json',
  },
});

export default authFetch;

export const getUniqueValue = (data, type) => {
  let unique = data.map((val) => val[type]);
  // if (type === 'colors') {
  //   unique = unique.flat();
  // }
  return ['all', ...new Set(unique)];
};
