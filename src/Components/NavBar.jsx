import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo2.svg';
import { HiOutlineSearch } from 'react-icons/hi';

import { useSelector, useDispatch } from 'react-redux';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { CiUser } from 'react-icons/ci';
import { useEffect, useState, useRef } from 'react';
import { navFunction } from '../axios/data';
import { updateFilters, filterSearch } from '../product__features/productSlice';

const NavBar = () => {
  const dispatch = useDispatch();
  const {
    filters: { text },
  } = useSelector((store) => store.product);
  const [isFixed, setIsFixed] = useState(false);
  // MAKING THE NAV FIXED ON SCROLL
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navbarStyle = {
    position: isFixed ? 'fixed' : 'relative',
    top: isFixed ? 0 : 'auto',
    transition: 'background-color 0.3s ease-in-out',
    width: '100%',
    zIndex: 500,
  };
  // END

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(updateFilters({ name, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(filterSearch());
    console.log('segun');
  };

  return (
    <nav
      // ref={navbarRef}
      className="py-4 z-[1000] bg-white "
      style={navbarStyle}
    >
      <section className="flex flex-wrap gap-4  lg:gap-0 cont items-center relative justify-between align-el">
        <div className="w-[10%]">
          <NavLink to="/">
            <img src={logo} alt="" className="h-10 lg:w-[6rem] w-[10rem]" />
          </NavLink>
        </div>

        {/* mobile view */}
        <div className="flex gap-6 items-center lg:hidden">
          <div className="hover:text-[#f68b1e] text-xl">
            <CiUser />
          </div>
          <div className="hover:text-[#f68b1e] text-xl">
            <MdOutlineShoppingCart />
          </div>
        </div>

        <div className="lg:w-[80%] w-full !px-0 ">
          <div className="flex items-center">
            {/* SEARCH */}
            <div className="w-full lg:w-[76%] ">
              <form className=" flex gap-3" onSubmit={handleSubmit}>
                <div className="border  border-[#a3a3a6] border-solid lg:rounded-[4px] rounded-[32px]  lg:w-[80%] w-full flex items-center pl-1 gap-2 ">
                  <HiOutlineSearch className="text-[1.5rem] font-bold text-[#7f7f83]" />
                  <span className="w-[95%]">
                    <input
                      type="search"
                      name="text"
                      value={text}
                      onChange={handleChange}
                      id=""
                      placeholder="Search products, brands and categories"
                      className="w-full py-[0.35rem] bg-transparent border-none outline-none lg:rounded-[4px] rounded-[32px]  text-md"
                    />
                  </span>
                </div>
                <button
                  type="submit"
                  className="bg-[#f68a1e] text-sm hidden lg:block uppercase text-white hover:bg-[#dd9349]  px-4 rounded-[4px] myShadow"
                >
                  Search
                </button>
              </form>
            </div>

            <div className="hidden lg:flex items-center gap-5 cursor-pointer">
              {navFunction.map((item) => {
                const { id, text, logo, genLogo } = item;

                return (
                  <div
                    key={id}
                    // onClick={() => handleInfoShow(id)}
                    className={`flex justify-center items-center gap-2 capitalize box-border hover:text-[#f68b1e] duration-300  py-2 rounded-[4px] `}
                  >
                    {logo}
                    <p>{text}</p>
                    {genLogo ? genLogo : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </nav>
  );
};
export default NavBar;
