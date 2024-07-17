import authFetch from '../axios/custom';

export const getAllProducts = async (__, thunkAPI) => {
  const { price, text, brand, category, sort } =
    thunkAPI.getState().product.filters;
  console.log({ price, text, brand, category, sort });
  let url = `/products?brand=${brand}&category=${category}&price=${price}&sort=${sort}`;
  if (text) {
    url = url + `&search=${text}`;
  }
  console.log(url);
  try {
    const resp = await authFetch.get(url);
    // console.log(resp.data);
    return resp.data;
  } catch (error) {
    return error;
  }
};
