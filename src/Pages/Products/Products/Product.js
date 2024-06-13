import React from 'react';
import { UserCircleIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/solid'

const Product = ({ product }) => {
  console.log(product);
  const {
    _id,
    productName,
    image,
    originalPrice,
    resalePrice,
    sellerName,
    location,
    description,
    phoneNumber,
    quality,
    purchaseTime,
    usedTime,
    available,
    advertise,
    postTime,
  } = product;

  const { hour, minute, seconds } = postTime;

  console.log(product);



  return (
    <div className='mb-10'>
      <div className='border rounded-lg grid md:grid-cols-4 gap-5'>
        <img src={image} className='md:h-[280px] lg:h-[200px] mx-auto col-span-4 md:col-span-2 lg:col-span-1' alt="" />

        <div className=' col-span-4 md:col-span-2 lg:col-span-3 grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5'>
          <div className='space-y-1 border-r-2 md:pr-2'>
            <h2 className='text-2xl font-semibold'> {productName}</h2>
            <div className='flex gap-10 font-semibold'>
              <p>Official {originalPrice}Tk</p>
              <p>Selling Price: {resalePrice}Tk</p>
            </div>
            <p>{description.length > 100 ? (description.slice(0, 100) + "...") : description}</p>
            <div className='space-x-2'>
              <button className='btn btn-primary btn-sm'>Book Now</button>
              <button className='btn btn-primary btn-sm'>See Details</button>
            </div>
          </div>

          <div className='space-y-1'>
            <p className='uppercase font-semibold'>seller info</p>
            <p> <UserCircleIcon className='h-4 w-4 inline-block' /> {sellerName}</p>
            <p> <PhoneIcon className='h-4 w-4 inline-block' /> {phoneNumber}</p>
            <p> <MapPinIcon className='h-4 w-4 inline-block' /> {location}</p>
            <p>Quality: <span className='uppercase'>{quality}</span></p>
            <p>Purchase Time: {purchaseTime}</p>
            <p>Used: {usedTime}</p>
            <p>Create Post: {`${hour} ${minute}m ${seconds}s`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;