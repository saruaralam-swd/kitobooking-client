import React from 'react';
import { Link } from 'react-router-dom';
import img from '../../assets/error.webp'

const ErrorPage = () => {
  return (
    <div>
      <img className='w-3/4 md:w-1/2 lg:w-1/3 block mx-auto' src={img} alt="" />
      <div className='text-center space-y-5'>
        <h2 className="text-7xl font-semibold">Oops!</h2>
        <Link to='/' className='block'><button className='uppercase border bg-indigo-600 text-white px-4 py-1 rounded-full font-semibold hover:bg-indigo-700'>go to Homepage</button></Link>
        <p>The page your are locking for might have been removed it's name change or is temporary unavailable</p>
      </div>
    </div>
  );
};

export default ErrorPage;