import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';
import useAdmin from '../../../hooks/UseAdmin';
import useBuyer from '../../../hooks/UseBuyer';
import useSeller from '../../../hooks/UseSeller';

const ProductGridView = ({ product, setProduct }) => {
  const { user } = useContext(AuthContext);
  const { _id, verify, productName, image, originalPrice, resalePrice, sellerName, location, description, phoneNumber, quality, purchaseTime, usedTime, available, advertise, postTime, } = product;
  const [isBuyer] = useBuyer(user?.email);
  const [isAdmin] = useAdmin(user?.email);
  const [isSeller] = useSeller(user?.email);

  return (
    <div className='border rounded-lg border-slate-100 shadow-lg hover:shadow-2xl duration-500'>
      <img className='md:h-[280px] lg:h-[200px] mx-auto my-5' src={image} alt="mobile phone img" />
      <div className='p-5'>
        <h2 className='text-2xl'>{productName}</h2>
        <div className='flex items-center gap-5 my-1'>
          <p className='text-blue-500 font-bold text-xl'>{resalePrice} TK</p>
          <p className='text-slate-600'><del>{originalPrice} TK</del></p>
        </div>
        <label onClick={() => setProduct(product)} htmlFor={isBuyer || !user ? 'product-order-modal' : 'xyz'} className={isAdmin || isSeller ? "btn bg-slate-600 disabled hover:cursor-not-allowed btn-sm mr-2" : "btn btn-primary btn-sm mr-2"}> Book Now </label>
      </div>
    </div>
  );
};

export default ProductGridView;