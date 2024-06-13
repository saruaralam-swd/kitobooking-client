import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import Loader from '../../../Components/Loader';
import { AuthContext } from '../../../Context/AuthProvider';
import useTittle from '../../../hooks/useTittle';
import { TrashIcon } from '@heroicons/react/24/solid'
import toast from 'react-hot-toast';

const ReportedProducts = () => {
  const { user } = useContext(AuthContext);
  useTittle('Report Product');

  const { data: reportedProducts = [], isLoading, refetch } = useQuery({
    queryKey: ['reportedProduct', user?.email],
    queryFn: async () => {
      const res = await fetch(`https://used-products-resale-server.vercel.app/reportedProduct?email=${user?.email}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      const data = await res.json();
      return data;
    }
  });

  if (isLoading) {
    return <Loader></Loader>
  }

  const handleReportProductDelete = id => {
    const permission = window.confirm('Are you sure want to delete this product?')
    if (permission) {
      fetch(`https://used-products-resale-server.vercel.app/reportProduct/${id}?email=${user?.email}`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
        .than(res => res.json())
        .than(data => {
          toast.success('product delete success')
          refetch();
        })
    }
  };

  return (
    <div>
      <h2 className="text-3xl mb-5 font-semibold">All Reported Products</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>S/N</th>
              <td>image</td>
              <td>Name</td>
              <td>action</td>
            </tr>
          </thead>

          <tbody>
            {
              reportedProducts.map((product, index) =>
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="avatar">
                      <div className="mask w-14 h-14">
                        <img src={product.image} alt="" />
                      </div>
                    </div>
                  </td>
                  <td>{product.productName}</td>
                  <td><button onClick={() => handleReportProductDelete(product._id)}><TrashIcon className='h-10 w-10 text-red-400' /></button></td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportedProducts;