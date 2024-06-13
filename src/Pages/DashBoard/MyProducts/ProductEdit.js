import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';

const ProductEdit = () => {
  const id = useParams();
  const { allPhones } = useContext(AuthContext);
  const phone = allPhones.find(phone => phone._id === id.id);
  const { productName } = phone;
  
  return (
    <div>
      <h2 className="text-3xl text-center font-semibold  mb-5 underline">{productName}</h2>
      <form className='px-10' >
        <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          <div>
            <label className="label text-sm font-semibold"><span className="label-text">Product Name</span></label>
            <input type="text" className='border border-indigo-500 focus:outline-1 focus:outline-indigo-600  w-full rounded-md px-4 py-1' required />
          </div>
        </div>

        <button className='btn btn-primary btn-md mt-5'>Update</button>
      </form>
    </div>
  );
};

export default ProductEdit;