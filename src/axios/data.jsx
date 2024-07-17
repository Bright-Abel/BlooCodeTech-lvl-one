import { CiUser } from 'react-icons/ci';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { IoMdHelpCircleOutline } from 'react-icons/io';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
const accountData = [
  {
    id: 1,
    // logo: <CiUser className="text-xl font-bold" />,
    text: 'name (a-z)',
    innerText: 'name-a',
  },
  {
    id: 2,
    // logo: <RxBorderSplit className="text-lg font-bold" />,
    text: 'name (z-a)',
    innerText: 'name-z',
  },
  {
    id: 3,
    // logo: <MdFavoriteBorder className="text-xl font-bold" />,
    text: 'price (highest)',
    innerText: 'price-highest',
  },
  {
    id: 4,
    // logo: <MdFavoriteBorder className="text-xl font-bold" />,
    text: 'price (lowest)',
    innerText: 'price-lowest',
  },
];

export const navFunction = [
  {
    id: 1,
    logo: <CiUser className="text-2xl font-bold" />,
    text: 'account',
    genLogo: <MdOutlineKeyboardArrowDown className="text-xl font-medium" />,
  },
  {
    id: 2,
    logo: <IoMdHelpCircleOutline className="text-2xl font-bold" />,
    text: 'help',
    genLogo: <MdOutlineKeyboardArrowDown className="text-xl font-medium" />,
  },
  {
    id: 3,
    logo: <MdOutlineShoppingCart className="text-2xl font-bold" />,
    text: 'cart',

    // genLogo: <MdOutlineKeyboardArrowDown className="text-xl font-medium" />,
  },
];

export default accountData;
