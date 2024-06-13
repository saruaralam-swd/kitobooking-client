import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import useAdmin from '../hooks/UseAdmin';
import useBuyer from '../hooks/UseBuyer';
import useSeller from '../hooks/UseSeller';
import useTittle from '../hooks/useTittle';
import Header from '../Pages/Shared/Header/Header';
import dashBoardIcon from '../assets/Dashboard/dashboard2.svg';
import profile from '../assets/Dashboard/img.png'
import buyersIcon from '../assets/Dashboard/Seller/buyers.svg';
import Loader from '../Components/Loader';
import { BiLogOut, BiUserCircle } from "react-icons/bi";
import { MdPeopleAlt, MdReport } from "react-icons/md";
import { AiOutlineHeart, AiOutlineUnorderedList, } from "react-icons/ai";
import { GoTasklist } from "react-icons/go";
import { TbPlaylistAdd } from "react-icons/tb";
import { FiUsers } from "react-icons/fi";


const DashBoardLayout = () => {
  useTittle('Dashboard')
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin(user?.email);
  const [isSeller, isSellerLoading] = useSeller(user?.email)
  const [isBuyer, isBuyerLoading] = useBuyer(user?.email);

  if (isAdminLoading || isSellerLoading || isBuyerLoading) {
    return <Loader></Loader>
  }

  const handleLogOut = () => {
    logOut()
      .then(() => { })
      .catch(err => {
        console.log(err.message);
      })
  };

  return (
    <div>
      <div className={isAdmin && 'hidden'}>
        <Header></Header>
      </div>

      <div className='h-[50px] bg-slate-300 md:hidden flex justify-end'>
        <label htmlFor="dashBoard-drawer" tabIndex={2} className="btn btn-ghost lg:hidden">
          {/* <Squares2X2Icon className="h-6 w-6 text-black mr-2" /> */}
          <img src={dashBoardIcon} className='w-5 h-5 mr-2' alt="" />
          {/* <strong>DashBoard</strong> */}
        </label>
      </div>

      <div className="drawer drawer-mobile">
        <input id="dashBoard-drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content p-5">
          <Outlet></Outlet>
        </div>

        <div className="drawer-side">
          <label htmlFor="dashBoard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-60 duration-500 bg-base-100 md:bg-base-100/0 lg:bg-slate-100 text-base-content">
            <img src={profile} className='w-24 h-24 block mx-auto rounded-full' alt="" />
            {
              isAdmin && <h2 className='text-center font-bold uppercase'>Admin</h2>
            }
            {
              isSeller && <h2 className='text-center font-bold uppercase'>Seller</h2>
            }
            {
              isBuyer && <h2 className='text-center font-bold uppercase'>Buyer</h2>
            }
            <div className='divider'></div>


            <li><Link to='/dashboard'>
              <BiUserCircle className='h-5 w-5' />
              DashBoard
            </Link>
            </li>

            {
              isBuyer && <>
                <li><Link to='/dashboard/myOrders'> <AiOutlineUnorderedList /> My Orders</Link></li>
                <li><Link to='/dashboard/myWishList'><AiOutlineHeart /> My Wishlist</Link></li>
              </>
            }

            {
              isSeller && <>
                <li>
                  <Link to='/dashboard/myProducts'>
                    <GoTasklist />
                    My Products
                  </Link>
                </li>

                <li>
                  <Link to='/dashboard/addProducts'>
                    <TbPlaylistAdd />
                    Add Products
                  </Link>
                </li>

                <li>
                  <Link to='/dashboard/myBuyer'>
                    <FiUsers />
                    My Buyer
                  </Link>
                </li>
              </>
            }

            {
              isAdmin && <>
                <li><Link to='/dashboard/allSeller'><MdPeopleAlt className='h-5 w-5' /> All Seller</Link></li>
                <li><Link to='/dashboard/allBuyer'><MdPeopleAlt className='h-5 w-5' /> All Buyer</Link></li>
                <li><Link to='/dashboard/reportedProducts'><MdReport className='h-5 w-5' />Reported products</Link></li>
              </>
            }

            <li>
              <button onClick={handleLogOut} className=' text-black hover:bg-blue-600 hover:text-white'> <BiLogOut className='w-5 h-5' /> Sign out</button>
            </li>

          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;