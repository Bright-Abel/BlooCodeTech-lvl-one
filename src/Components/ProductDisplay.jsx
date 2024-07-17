import { useLoaderData } from 'react-router-dom';
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';
// import { fetchProducts } from '../product__features/productSlice';
import img from '../assets/empty.svg';
import {
  sortFilter,
  productFilter,
  hideSort,
  updateSort,
  clearFilters,
  updateFilters,
} from '../product__features/productSlice';
import AOS from 'aos';
import 'aos/dist/aos.css';
import useSyncFiltersWithUrl from './useSyncFiltersWithUrl';

import accountData from '../axios/data';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Stars from './Stars';
import styled from 'styled-components';
import ReactPaginate from 'react-paginate';

//: { text, brand, category, sort }
const ProductDisplay = () => {
  const { filters, filtered_products, hideSortPanel, info } = useSelector(
    (store) => store.product
  );

  const dispatch = useDispatch();

  useEffect(() => {
    // AOS EFFECT
    AOS.init({
      duration: 1200,
      // easing: 'ease-in-sine',
      anchorPlacement: 'center-bottom',
    });
    // END

    dispatch(productFilter());
    dispatch(updateSort());
  }, [filters]);

  useSyncFiltersWithUrl(filters);

  const handleClick = (e) => {
    const name = e.target.dataset.name;
    const value = e.target.dataset.value;
    const info = e.target.dataset.info;
    const id = e.target.dataset.id;
    dispatch(sortFilter({ name, value, info, id }));
  };

  // PAGINATION FORMULATION
  const [pageNumber, setPageNumber] = useState(0);

  const pageVisited = pageNumber * 10;

  const displayInfo = filtered_products
    .slice(pageVisited, pageVisited + 10)
    .map((item) => {
      const {
        id,
        price,
        rating,
        description,
        warrantyInfo,
        discountPercentage,
        images,
        title,
        reviews,
        availabilityStatus,
      } = item;
      const originalValue = 1 - discountPercentage / 100;
      const discountFactor = (price / originalValue).toFixed(2);
      const roundNumb = Math.round(discountPercentage);
      return (
        <div
          key={id}
          className=" bg-white   hover:shadow-2xl  relative rounded-lg flex flex-col gap-3 lg:gap-6 w-[calc(50%-6px)] md:w-[calc(33.333%-8px)] lg:w-[calc(25%-8px)] cursor-pointer lg:hover:scale-[1.02] duration-500"
        >
          <img src={images} alt={title} className="rounded-t-lg" />
          <span className=" lg:hidden absolute top-3 right-3 block text-[#f68b1e] bg-[#fef3e9]  rounded-sm py-[2px] px-1 font-medium  text-sm lg:text-sm">
            -{roundNumb}%
          </span>
          <div className="px-2 py-2">
            <span className=" bg-[#276076] text-[.625rem] py-[2px] px-2 font-medium w-fit rounded-[2px] text-white">
              {availabilityStatus}
            </span>
            <span></span>
            <div className="">
              <h3 className="text-[.75rem] leading-tight overflow-hidden textStyle font-[400] ">
                {description}
              </h3>
              <h5 className="text-[.875rem] font-[500] mt-[4px] ">${price}</h5>
              <div className="flex gap-2">
                <div className="line-through text-[#75757a] text-[.75rem]">
                  ${discountFactor}
                </div>
                {/* bg-[#fef3e9] */}
                <span className="hidden lg:block text-[#f68b1e] bg-[#fef3e9]  rounded-sm py-[2px] px-1 font-medium  text-sm lg:text-sm">
                  -{roundNumb}%
                </span>
              </div>
              <Stars stars={rating} reviews={reviews} />
            </div>

            <button
              type="button"
              className="w-full bg-[#f68b1e] text-sm md:text-lg  text-white font-medium py-[8px] md:py-[12px] px-[16px] flex items-center justify-center uppercase rounded-[4px] mt-6 shadow-sm"
            >
              Add to cart
            </button>
          </div>
        </div>
      );
    });

  const numberOfPages = Math.ceil(filtered_products.length / 10);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  // PAGINATION FORMULATION ENDS

  if (filtered_products.length === 0) {
    return (
      <div className="flex flex-col gap-1 min-h-screen">
        <div className="bg-[#e61601] px-5 py-4 text-white flex justify-between items-center rounded-t-lg">
          <div className="text-white flex items-center gap-2">
            <h1 className="text-lg font-medium  truncate ">All Products</h1>
            <p className="text-sm font-(400)">
              ({filtered_products.length} products found)
            </p>
          </div>
          <div className="font-medium relative">
            <div
              onClick={() => dispatch(hideSort())}
              className={`cursor-pointer hover:bg-[#e2e1e173] py-2 px-2 rounded-md flex items-center justify-center gap-5 ${
                !hideSortPanel &&
                'bg-[#d4cece] hover:bg-[#d4cece] text-[#313133]'
              }`}
            >
              <span>
                Sort by: <span className="capitalize">{filters.sort}</span>
              </span>
              {hideSortPanel ? (
                <IoIosArrowDown className="font-bold text-lg" />
              ) : (
                <IoIosArrowUp className="font-bold text-lg" />
              )}
            </div>
          </div>
        </div>
        <div className="flex bg-white justify-center items-center flex-col py-24">
          <img
            src={img}
            alt=""
            className="w-[29%] mx-auto"
            data-aos="zoom-in"
            data-aos-delay="400"
          />
          <h1
            className="capitalize mt-4 text-3xl font-bold tracking-tight sm:text-5xl"
            data-aos="zoom-in-right"
            data-aos-delay="400"
          >
            No product found
          </h1>
          <p
            className="mt-6 text-lg leading-7 capitalize"
            data-aos="zoom-in-left"
            data-aos-delay="400"
          >
            Sorry, your search couldn't return any product try again.
          </p>
          <div className="mt-10 ">
            <button
              onClick={() => dispatch(clearFilters())}
              className="bg-[#f68b1e] hover:shadow-xl font-semibold duration-300 px-4 py-2 rounded-lg text-white"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Wrapper className="">
      <div className="bg-[#4EB1BA] hidden md:flex px-5 py-2 lg:py-4 text-white  justify-between items-center rounded-t-lg">
        <div className="text-white flex items-center  gap-2">
          <h1 className="text-lg font-medium  truncate ">All Products</h1>
          <p className="text-sm font-(400)">
            ({filtered_products.length} products found)
          </p>
        </div>
        <div className="font-medium relative">
          <div
            onClick={() => dispatch(hideSort())}
            className={`cursor-pointer hover:bg-[#e2e1e173] py-2 px-2 rounded-md flex items-center justify-center gap-5 ${
              !hideSortPanel && 'bg-[#d4cece] hover:bg-[#d4cece] text-[#313133]'
            }`}
          >
            <span>
              Sort by: <span className="capitalize">{filters.sort}</span>
            </span>
            {hideSortPanel ? (
              <IoIosArrowDown className="font-bold text-lg" />
            ) : (
              <IoIosArrowUp className="font-bold text-lg" />
            )}
          </div>
          <div
            className={`bg-white absolute  w-[12rem]  font-normal left-2 rounded-md px-2 hover:px-0 duration-500  pb-2 z-30 ${
              hideSortPanel ? 'hidden ' : 'hidden lg:block'
            } `}
          >
            <div className=" " onClick={() => dispatch(hideSort())}>
              {accountData.map((data) => {
                const { id, innerText, text } = data;
                return (
                  <div
                    key={id}
                    className=" py-[.5rem] cursor-pointer hover:bg-gray-200 first-of-type:rounded-t-md last-of-type:rounded-b-md"
                  >
                    <h1
                      data-name="sort"
                      data-value={text}
                      data-id="info"
                      data-info={innerText}
                      onClick={handleClick}
                      className="flex items-center gap-4 px-2 capitalize cursor-pointer text-[#313133]"
                    >
                      {text}
                    </h1>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#FF6F61] flex md:hidden capitalize font-bold px-5 py-2 lg:py-4 text-white  justify-center">
        All products
      </div>
      <div className="mt-2 lg:bg-white bg-[#e4e4e4] rounded-lg flex flex-wrap gap-x-2 gap-y-4 w-full  items-center">
        {displayInfo}
      </div>
      {/* PAGINATION */}
      {filtered_products.length > 10 && (
        <ReactPaginate
          previousLabel={'Prev'}
          nextLabel={'Next'}
          pageCount={numberOfPages}
          onPageChange={changePage}
          containerClassName={'paginationBttns'}
          previousLinkClassName={'previousBttn'}
          nextLinkClassName={'nextBttn'}
          disabledClassName={'disabledBttn'}
          activeClassName={'active'}
        />
      )}
    </Wrapper>
  );
};
export default ProductDisplay;

const Wrapper = styled.section`
  .textStyle {
    display: -webkit-box;
    white-space: normal;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .paginationBttns {
    /* width: 80%; */
    height: 40px;
    display: flex;
    justify-content: right;
    /* gap: 10px; */
    margin-top: 2rem;
  }
  @media screen and (max-width: 640px) {
    .paginationBttns {
      justify-content: center;
      gap: 10px;
    }
  }
  .previous a,
  .next a {
    margin-right: 1rem;
    margin-left: 1rem;
    border: 1px solid #d1d5db;
    background: transparent !important;
    border-radius: 5px;
  }

  .paginationBttns a {
    padding: 5px 7px;
    margin-top: 8px;
    background: #d1d5db;
  }

  .active a {
    background: #dce3ec;
    color: #f68b1e;
  }
`;
