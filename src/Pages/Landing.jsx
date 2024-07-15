import { authFetch } from '../axios';
import axios from 'axios';
import { ProductDisplay, Filters } from '../Components';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { updateProduct } from '../product__features/productSlice';
import { useLoaderData } from 'react-router-dom';

const featuredProductQuery = {
  queryKey: 'axios(url)',
  queryFn: () => authFetch(url),
};

const url = 'https://dummyjson.com/products';

export const loader = (queryClient) => async () => {
  const {
    data: { products },
  } = await queryClient.ensureQueryData(featuredProductQuery);
  // const products = response.data.products;
  return { products };
};
const Landing = () => {
  const { products } = useLoaderData();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateProduct(products));
  }, []);
  return (
    <Wrapper>
      <div className="products">
        <Filters />
        <ProductDisplay />
      </div>
      <div className=""></div>
    </Wrapper>
  );
};
export default Landing;

const Wrapper = styled.section`
  position: relative;
  .products {
    display: grid;
    gap: 3rem 1.5rem;
    margin: 4rem auto;
  }
  @media (min-width: 768px) {
    .products {
      grid-template-columns: 260px 1fr;
    }
  }
`;
