import { createSlice } from '@reduxjs/toolkit';

// Initial filter state
const initialFilterState = {
  text: '',
  brand: 'all',
  category: 'all',
  min_price: 0,
  max_price: 0,
  price: 0,
  info: 'name-a',
  sort: 'name (a-z)',
};

// Load filters from local storage
const loadFilters = () => {
  try {
    const serializedState = sessionStorage.getItem('filters');
    if (serializedState === null) {
      return initialFilterState;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Could not load filters', err);
    return initialFilterState;
  }
};

// Load filtered products from local storage
const loadFilteredProducts = () => {
  try {
    const serializedState = sessionStorage.getItem('filtered_products');
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Could not load filtered products', err);
    return [];
  }
};

// Save filters to local storage
const saveFilters = (filters) => {
  try {
    const serializedState = JSON.stringify(filters);
    sessionStorage.setItem('filters', serializedState);
  } catch (err) {
    console.error('Could not save filters', err);
  }
};

// Save filtered products to local storage
const saveFilteredProducts = (filteredProducts) => {
  try {
    const serializedState = JSON.stringify(filteredProducts);
    sessionStorage.setItem('filtered_products', serializedState);
  } catch (err) {
    console.error('Could not save filtered products', err);
  }
};

// Initial state
const initialState = {
  hideSortPanel: true,
  filtered_products: loadFilteredProducts(),
  isLoading: false,
  all_product: [],

  filters: loadFilters(),
};

// Apply filters to products
const applyFilters = (products, filters) => {
  let tempProduct = [...products];

  if (filters.text) {
    tempProduct = tempProduct.filter((product) =>
      product.description.toLowerCase().startsWith(filters.text.toLowerCase())
    );
  }
  if (filters.category !== 'all') {
    tempProduct = tempProduct.filter(
      (product) => product.category === filters.category
    );
  }
  if (filters.brand !== 'all') {
    tempProduct = tempProduct.filter(
      (product) => product.brand === filters.brand
    );
  }
  if (filters.price !== 0) {
    tempProduct = tempProduct.filter(
      (product) => product.price <= filters.price
    );
  }

  return tempProduct;
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    updateFilters: (state, { payload: { name, value } }) => {
      state.filters[name] = value;
      saveFilters(state.filters);
    },
    hideSort: (state) => {
      state.hideSortPanel = !state.hideSortPanel;
    },
    sortFilter: (state, { payload: { name, value, id, info } }) => {
      state.filters[name] = value;
      state.filters[id] = info;
      saveFilters(state.filters);
    },
    updateProduct: (state, { payload }) => {
      state.all_product = payload;
      let maxPrice = payload.map((product) => product.price);
      maxPrice = Math.max(...maxPrice);
      state.filters.max_price = maxPrice;
      state.filters.price = maxPrice;
      saveFilters(state.filters);
      state.filtered_products = applyFilters(state.all_product, state.filters);
      saveFilteredProducts(state.filtered_products);
    },
    filterSearch: (state) => {
      state.filtered_products = applyFilters(state.all_product, state.filters);
      saveFilteredProducts(state.filtered_products);
    },
    productFilter: (state) => {
      state.filtered_products = applyFilters(state.all_product, state.filters);
      saveFilteredProducts(state.filtered_products);
    },
    updateSort: (state) => {
      const { filtered_products } = state;
      const { info } = state.filters;

      let tempProducts = [...filtered_products];

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

      state.filtered_products = tempProducts;
      saveFilteredProducts(state.filtered_products);
    },
    clearFilters: (state) => {
      state.filters = initialFilterState;
      saveFilters(state.filters);
      state.filtered_products = applyFilters(state.all_product, state.filters);
      saveFilteredProducts(state.filtered_products);
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
