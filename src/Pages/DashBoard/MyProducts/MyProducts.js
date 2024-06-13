import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import Loader from '../../../Components/Loader';
import { AuthContext } from '../../../Context/AuthProvider';
import { TrashIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom';

const MyProducts = () => {
  const { user } = useContext(AuthContext);

  const { data: products = [], isLoading, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch(`https://used-products-resale-server.vercel.app/myProducts?email=${user?.email}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        },
      });
      const data = await res.json();
      return data;
    }
  });

  if(isLoading) {
    return <Loader></Loader>
  }

  const handleAdvertise = id => {
    fetch(`https://used-products-resale-server.vercel.app/products/${id}?email=${user?.email}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        refetch();
        if (data.acknowledged) {
          toast.success('Advertise Done')
        }
      })
  }

  const handleProductDelete = (id, produceName) => {
    const permission = window.confirm(`${produceName}, Are your sure your want to delete?`)
    if (permission) {
      fetch(`https://used-products-resale-server.vercel.app/product/${id}?email=${user?.email}`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.acknowledged) {
            toast.success('successfully delete your product')
            refetch()
          }
        })
    }
  };

  return (
    <div>
      <h2 className="text-3xl mb-5 font-semibold">My Products</h2>
      <table className="table w-full">

        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>email</th>
            <th>status</th>
            <th>Price</th>
            <th>advertise</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {
            products?.map((product, index) =>
              <tr key={product._id}>
                <th>{index + 1}</th>
                <td>{product?.productName}</td>
                <td>{product?.sellerEmail}</td>
                <td>{product?.available ? "available" : "sold"}</td>
                <td>{product?.resalePrice} Tk</td>
                <td>
                  {
                    product?.advertise === false &&  <button onClick={() => handleAdvertise(product._id)} className='btn-primary rounded-full px-4 py-1'>advertise</button>
                  }
                  {
                    product?.advertise && <span className='bg-slate-200 rounded-full px-4 py-1'>advertising</span>
                  }
                </td>
                <td>
                  <Link to={`/dashboard/productEdit/${product?._id}`} className='btn btn-primary btn-sm'>edit</Link>
                </td>
                <td className='space-x-2'>
                  <button onClick={() => handleProductDelete(product._id, product?.productName)}><TrashIcon className='h-7 w-7 text-red-400' /></button>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
};

export default MyProducts;