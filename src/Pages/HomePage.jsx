import { Outlet } from 'react-router-dom';
import { NavBar } from '../Components';
const HomePage = () => {
  return (
    <main className=" bg-[#f1f1f2] min-h-screen flex flex-col justify-between  relative">
      <NavBar />
      <div className="align-el relative mt-2 lg:mt-20">
        <Outlet />
      </div>
    </main>
  );
};
export default HomePage;
