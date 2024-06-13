import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/image/logo.png";
import { AuthContext } from "../../../Context/AuthProvider";
import { BiLogOut } from "react-icons/bi";
import { MdOutlineDashboard } from "react-icons/md";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((err) => {
        console.log(err.message);
      });
  };

  const navMenu = (
    <>
      <li>
        <NavLink to="/home">Home</NavLink>
      </li>
      <li>
        <NavLink to="/category">Phones</NavLink>
      </li>
      <li>
        <NavLink to="/blog">Blog</NavLink>
      </li>
      {/* <li>
        <NavLink to="/side">sidebar</NavLink>
      </li> */}
      {/* <li>
        <NavLink to="/about">About</NavLink>
      </li>
      <li>
        <NavLink to="/contact">Contact</NavLink>
      </li> */}
    </>
  );

  const dropDownMenu = (
    <>
      <li>
        <NavLink
          to="/home"
          className="bg-white text-black hover:bg-blue-600 hover:text-white"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/phone"
          className="bg-white text-black hover:bg-blue-600 hover:text-white"
        >
          Phones
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/blog"
          className="bg-white text-black hover:bg-blue-600 hover:text-white"
        >
          Blog
        </NavLink>
      </li>
      {/* <li><NavLink to='/about' className='bg-white text-black hover:bg-blue-600 hover:text-white'>About</NavLink></li> */}
      {/* <li><NavLink to='/contact' className='bg-white text-black hover:bg-blue-600 hover:text-white'>Contact</NavLink></li> */}
    </>
  );

  return (
    <>
      <div className="navbar bg-white/80 backdrop-blur sticky top-0 z-[999] border-b px-3">
        <div className="navbar-start">
          <Link to="/" className="flex items-center">
            <img src={logo} className="w-8 mr-3" alt="" />
            <p className="font-semibold text-xl">
              Buy <span className="text-blue-700">&</span> Sell
            </p>
          </Link>
        </div>

        <div className="navbar-center hidden md:flex gap-5">
          <ul className="flex gap-5">{navMenu}</ul>
        </div>

        <div className="navbar-end">
          <label className="swap swap-rotate">
            <input type="checkbox" />
            <svg
              className="swap-on fill-current w-7 h-7 text-blue-700"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>
            <svg
              className="swap-off fill-current w-7 h-7 text-blue-700"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>

          {/* small device bars3*/}
          {user?.uid ? (
            <>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="avatar placeholder">
                    <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                      <span className="text-xs">AA</span>
                    </div>
                  </div>
                </label>

                <ul
                  tabIndex={0}
                  className="menu menu-compact dropdown-content mt-2 p-1 shadow rounded-md border w-52 bg-white"
                >
                  <p className="md:hidden border-b-2">{dropDownMenu}</p>
                  <li>
                    <NavLink
                      to="/dashboard"
                      className="bg-white text-black hover:bg-blue-600 hover:text-white"
                    >
                      {" "}
                      <MdOutlineDashboard className="w-5 h-5" /> Dashboard
                    </NavLink>{" "}
                  </li>
                  <li>
                    <button
                      onClick={handleLogOut}
                      className="bg-white text-black hover:bg-blue-600 hover:text-white"
                    >
                      {" "}
                      <BiLogOut className="w-5 h-5" /> Sign out
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <button>
                <Link
                  to="/login"
                  className="px-4 py-2 border rounded-md font-semibold duration-300 hidden md:block text-black bg-white hover:bg-gray-100 hover:text-blue-700 mx-2"
                >
                  Login
                </Link>
              </button>
              <button>
                <Link
                  to="/signup"
                  className="px-4 py-2 border rounded-md font-semibold duration-300 hidden md:block text-white bg-primary hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </button>

              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar md:hidden"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16"
                    />
                  </svg>
                </label>

                <ul
                  tabIndex={0}
                  className="menu menu-compact dropdown-content mt-2 p-1 shadow rounded-md border w-52 bg-white"
                >
                  {dropDownMenu}
                  <span className="border-b-2 mt-2"></span>
                  <li>
                    <NavLink
                      to="/login"
                      className="bg-white text-black hover:bg-blue-600 hover:text-white"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/signup"
                      className="bg-white text-black hover:bg-blue-600 hover:text-white"
                    >
                      Sign Up
                    </NavLink>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
