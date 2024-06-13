import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import sortImg from '../../../assets/image/sort.png'
import ProductListView from './ProductListView';
import ProductGridView from './ProductGridView';
import ProductOrderModal from '../ProductOrderModal/ProductOrderModal';
import Loader from '../../../Components/Loader';
import useBuyer from '../../../hooks/UseBuyer';

const AllPhones = () => {
  const { user, allPhones, allPhonesLoading } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [isAsc, setIsAsc] = useState('');
  const [productView, setProductView] = useState(true);
  const [isBuyer] = useBuyer(user?.email);

  if (isAsc === 'Low Price') {
    allPhones.sort(function (a, b) { return a.resalePrice - b.resalePrice });
  }
  if (isAsc === 'High Price') {
    allPhones.sort(function (a, b) { return b.resalePrice - a.resalePrice });
  }

  if (allPhonesLoading) {
    return <Loader />
  }

  return (
    <div className='px-4'>
      <div className='flex items-center justify-end gap-3 my-4'>
        <div className='flex items-center'>
          <select onChange={(e) => setIsAsc(e.target.value)} className="select select-bordered select-sm w-56 focus:outline-none">
            <option disabled selected>-- Price --</option>
            <option>Low Price</option>
            <option>High Price</option>
          </select>
          <img src={sortImg} alt="" />
        </div>

        <BsFillGrid3X3GapFill title='Grid View' onClick={() => setProductView(false)} className='w-5 h-5 font-semibold cursor-pointer inline-block' />
        <FaListUl title='List View' onClick={() => setProductView(true)} className='w-5 h-5 font-semibold cursor-pointer inline-block' />
      </div>

      {
        productView ?
          allPhones.map(product => <ProductListView setProduct={setProduct} key={product._id} product={product}></ProductListView>)
          :
          <div className='grid md:grid-cols-3 gap-10'>
            {allPhones.map(product => <ProductGridView setProduct={setProduct} key={product._id} product={product}></ProductGridView>)}
          </div>
      }

      {
        product && <ProductOrderModal product={product} setProduct={setProduct}></ProductOrderModal>
      }
    </div>
  );
};

export default AllPhones;