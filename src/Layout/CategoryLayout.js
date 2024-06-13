import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import logo from '../assets/image/logo.png';
import { BiCategory } from "react-icons/bi";

const CategoryLayout = () => {
  const { categories, categoriesLoading } = useContext(AuthContext);

  return (
    <div>
      <div className="text-right lg:hidden">
        <label
          htmlFor="category"
          className="drawer-button  hover:bg-blue-100  rounded-md inline-block tooltip tooltip-left mr-5 mt-2"
          data-tip="Phone Categories"
        >
          <BiCategory className='w-7 h-7 cursor-pointer' />
        </label>
      </div>

      <div className="drawer drawer-mobile h-auto overflow-visible">
        <input id="category" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content overflow-y-auto">
          <Outlet></Outlet>
        </div>

        <div className="drawer-side">
          <label htmlFor="category" className="drawer-overlay"></label>

          <ul className="menu w-80 p-2 bg-base-100 text-base-content lg:bg-slate-50">
            <div className="divider">
              <h2 className='font-semibold pl-4 uppercase'>Shop By Categories</h2>
            </div>

            <NavLink to='/category' className={({ isActive }) => isActive ? 'flex justify-between rounded-md px-2 mb-2 bg-blue-300' : 'flex justify-between rounded-md px-2 mb-2 hover:bg-slate-200'}>
              <span>All Phones</span>
            </NavLink>

            {
              !categoriesLoading &&
              categories.map(category =>
                <NavLink to={`/category/${category?._id}`} key={category._id} className={({ isActive }) => isActive ? 'flex justify-between rounded-md px-2 mb-2 bg-blue-300' : 'flex justify-between rounded-md px-2 mb-2 hover:bg-slate-200'}>
                  <span>{category?.categoryName}</span>
                </NavLink>
              )
            }
          </ul>
        </div>
      </div>
    </div>
  );  
};

export default CategoryLayout;