import { configureStore } from '@reduxjs/toolkit';

import productSlice from './product__features/productSlice';

export const store = configureStore({
  reducer: {
    product: productSlice,
  },
});
