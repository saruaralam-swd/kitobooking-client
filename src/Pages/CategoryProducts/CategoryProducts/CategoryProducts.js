import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';
import ProductOrderModal from '../ProductOrderModal/ProductOrderModal';
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import sortImg from '../../../assets/image/sort.png'
import ProductListView from './ProductListView';
import ProductGridView from './ProductGridView';

const CategoryProducts = () => {
  const id = useParams();
  const [product, setProduct] = useState(null);
  const [isAsc, setIsAsc] = useState('');
  const [productView, setProductView] = useState(true);

  const { allPhones } = useContext(AuthContext);
  const categoryProducts = allPhones.filter(phone => phone?.categoryId === id.id);


  if (isAsc === 'Low Price') {
    categoryProducts.sort(function (a, b) { return a.resalePrice - b.resalePrice });
    allPhones.sort(function (a, b) { return a.resalePrice - b.resalePrice });
  }
  if (isAsc === 'High Price') {
    categoryProducts.sort(function (a, b) { return b.resalePrice - a.resalePrice });
    allPhones.sort(function (a, b) { return b.resalePrice - a.resalePrice });
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

        <BsFillGrid3X3GapFill onClick={() => setProductView(false)} className='w-5 h-5 font-semibold cursor-pointer inline-block' />
        <FaListUl onClick={() => setProductView(true)} className='w-5 h-5 font-semibold cursor-pointer inline-block' />
      </div>

      {categoryProducts.length > 0 ?
        productView ?
          <div>
            {categoryProducts.map(product => <ProductListView setProduct={setProduct} key={product._id} product={product}></ProductListView>)}
          </div>
          :
          <div className='grid md:grid-cols-3 gap-10'>
            {categoryProducts.map(product => <ProductGridView setProduct={setProduct} key={product._id} product={product}></ProductGridView>)}
          </div>
        :
        <h2 className="text-center h-[600px] flex items-center justify-center text-3xl">Phone Not Found</h2>
      }

      {
        product && <ProductOrderModal product={product} setProduct={setProduct}></ProductOrderModal>
      }
    </div>
  );
};

export default CategoryProducts;