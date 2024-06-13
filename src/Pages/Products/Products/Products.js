import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Product from './Product';

const Products = () => {
  const allProducts = useLoaderData();
  const products = (allProducts[0].products);
  console.log(products);

  return (
    <div>
      <h2 className='text-2xl font-semibold'>{allProducts[0].name}</h2>
      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {
          products.map(product => <Product key={product._id} product={product}></Product>)
        }
      </div>
    </div>
  );
};

export default Products;