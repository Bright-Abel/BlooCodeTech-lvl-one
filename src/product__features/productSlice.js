import { createSlice } from '@reduxjs/toolkit';
import { useEffect } from 'react';

const initialState = {
  hideSortPanel: true,
  filtered_products: [],
  all_product: [],
  sort: 'name (a-z)',
  info: '',
  filters: {
    text: '',
    brand: 'all',
    category: 'all',
    // color: 'all',
    min_price: 0,
    max_price: 0,
    price: 0,
    // shipping: false,
  },
};

export const productSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateFilters: (state, { payload: { name, value } }) => {
      state.filters[name] = value;
    },
    hideSort: (state) => {
      state.hideSortPanel = !state.hideSortPanel;
    },
    sortFilter: (state, { payload: { name, value, id, info } }) => {
      state[name] = value;
      state[id] = info;
    },
    updateProduct: (state, { payload }) => {
      state.all_product = payload;
      let maxPrice = payload.map((product) => product.price);
      maxPrice = Math.max(...maxPrice);
      state.filters.max_price = maxPrice;
      state.filters.price = maxPrice;
    },
    filterSearch: (state) => {
      const { all_product } = state;
      const { text } = state.filters;
      let tempProduct = [...all_product];
      if (text) {
        tempProduct = tempProduct.filter((product) => {
          return product.description
            .toLowerCase()
            .startsWith(text.toLowerCase()); //startsWith or includes
        });
      }

      return { ...state, filtered_products: tempProduct };
    },
    productFilter: (state) => {
      const { all_product } = state;
      const { text, category, company, price, brand } = state.filters;
      let tempProduct = [...all_product];
      //   FILTERING
      // SEARCH

      // CATEGORY
      if (category !== 'all') {
        tempProduct = tempProduct.filter((product) => {
          return product.category === category;
        });
      }
      //   BRAND
      if (brand !== 'all') {
        tempProduct = tempProduct.filter((product) => {
          return product.brand === brand;
        });
      }

      // PRICE
      if (price !== 0) {
        tempProduct = tempProduct.filter((product) => {
          return product.price <= price;
        });
      }
      //   state.filtered_products = tempProduct;
      //   console.log(state.filtered_products.length);
      return { ...state, filtered_products: tempProduct };
    },
    updateSort: (state) => {
      const { info, filtered_products } = state;

      let tempProducts = [...filtered_products]; // Copy the filtered_products array

      switch (info) {
        case 'price-lowest':
          tempProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price-highest':
          tempProducts.sort((a, b) => b.price - a.price);
          break;
        case 'name-a':
          tempProducts.sort((a, b) =>
            a.description.localeCompare(b.description)
          );
          break;
        case 'name-z':
          tempProducts.sort((a, b) =>
            b.description.localeCompare(a.description)
          );
          break;
        default:
          break;
      }

      return { ...state, filtered_products: tempProducts };
    },

    clearFilters: (state) => {
      return {
        ...state,
        filters: {
          ...state.filters,
          text: '',
          company: 'all',
          category: 'all',
          color: 'all',

          price: state.filters.max_price,
          shipping: false,
        },
      };
    },
  },
});
export const {
  updateFilters,
  updateProduct,
  productFilter,
  sortFilter,
  hideSort,
  updateSort,
  filterSearch,
  clearFilters,
} = productSlice.actions;
export default productSlice.reducer;
