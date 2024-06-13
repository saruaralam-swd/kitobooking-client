import React from 'react';
import { BiPlusCircle } from "react-icons/bi";
import hosupe from '../../../assets/userDocument/hosupe.png'

const UserDocument = () => {
  return (
    <div className='md:flex items-center  mx-5 my-20 bg-white rounded-md p-2'>
      <div className='space-y-4 md:w-1/2'>
        <h2 className='text-2xl font-bold text-slate-700 mb-3'>User Documents For Everyone</h2>  
        <p className='text-base text-slate-500'>Real users will complete the registration by providing the email. Once the registration is completed, users can easily access the website. You can update your profile by going to the Personal Profile section. If users want to advertise, they have to advertise through the advertiser form. After adding the ad users have to wait for approval which will be available access by the website owner.</p>
        <div className='text-base text-slate-500'>
          <p><BiPlusCircle className='bg-primary rounded-full text-white inline-block mr-2' />Buy and Sell any Products.</p>
          <p><BiPlusCircle className='bg-primary rounded-full text-white inline-block mr-2' /> Any irrelevant product offered for sale will be rejected.</p>
          <p><BiPlusCircle className='bg-primary rounded-full text-white inline-block mr-2' />Requested not to provide any personal and sensitive information. This responsibility will never be accepted by the website authority.</p>
        </div>
      </div>
      <div className='md:w-1/2'>
        <img className='w-4/5' src={hosupe} alt="" />
      </div>
    </div>
  );
};

export default UserDocument;