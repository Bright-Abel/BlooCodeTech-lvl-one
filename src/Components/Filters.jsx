import { getUniqueValue } from '../axios/custom';
import { useLoaderData } from 'react-router-dom';
import {
  updateFilters,
  productFilter,
} from '../product__features/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useEffect } from 'react';
const Filters = () => {
  const { products } = useLoaderData();
  const {
    filters: { max_price, min_price, brand, price, category },
  } = useSelector((store) => store.product);
  // useEffect(() => {
  //   dispatch(productFilter());
  // }, [brand, price, category ])

  const dispatch = useDispatch();
  const categories = getUniqueValue(products, 'category');
  const brands = getUniqueValue(products, 'brand');

  const handleClick = (e) => {
    const name = e.target.dataset.name;
    const value = e.target.dataset.value;
    dispatch(updateFilters({ name, value }));
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(updateFilters({ name, value }));
  };
  return (
    <Wrapper className="text-[#313133] bg-white py-2 px-4 flex flex-col gap-4 rounded-lg h-fit">
      {/* CATEGORY */}
      <div className="">
        <h2 className="text-[.875rem] uppercase font-medium">Category</h2>
        <ul className="mt-2">
          {categories.map((item, index) => {
            return (
              <li key={index} className="py-[4px] px-4">
                <p
                  className={`capitalize text-[.875rem] cursor-pointer hover:text-[#f68b1e] duration-300 ${
                    category === item && 'text-[#f68b1e]'
                  }`}
                  data-name="category"
                  data-value={item}
                  onClick={(e) => handleClick(e)}
                >
                  {item}
                </p>
              </li>
            );
          })}
        </ul>
      </div>

      {/* BRAND */}
      <div className="">
        <h2 className="text-[.875rem] uppercase font-medium">Brand</h2>
        <ul className="max-h-[150px] overflow-y-auto scrollbar-style mt-2">
          {brands.map((item, index) => {
            return (
              <li key={index} className="py-[4px] px-4">
                <p
                  className={`capitalize text-[.875rem] cursor-pointer hover:text-[#f68b1e] duration-300 ${
                    brand === item && 'text-[#f68b1e]'
                  }`}
                  data-name="brand"
                  data-value={item}
                  onClick={handleClick}
                >
                  {item}
                </p>
              </li>
            );
          })}
        </ul>
      </div>

      {/* PRICE RANGE */}
      <div className="">
        <h2 className="text-[.875rem] uppercase font-medium">price</h2>

        <p className="text-[#f68b1e] font-medium text-sm py-[4px] px-4">
          ${price}
        </p>
        <div className="py-[4px] px-4">
          <div className=" w-full">
            <input
              type="range"
              name="price"
              onChange={handleChange}
              min={min_price}
              max={max_price}
              value={price}
              className="w-full "
            />
          </div>
          <div className="flex justify-between text-[#313133] font-semibold mt-[-6px] text-[.8rem]">
            <p>${min_price}</p>
            <p>${max_price}</p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default Filters;

const Wrapper = styled.section`
  .scrollbar-style::-webkit-scrollbar {
    width: 6px;
  }

  /* .scrollbar-style::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 4px;
  } */

  /* Firefox */
  .scrollbar-style {
    scrollbar-width: thin;
  }
`;
