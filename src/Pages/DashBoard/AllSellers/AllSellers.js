import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';
import { CheckBadgeIcon, TrashIcon } from '@heroicons/react/24/solid'
import useTittle from '../../../hooks/useTittle';
import Loader from '../../../Components/Loader';

const AllSellers = () => {
  useTittle('All Seller')
  const { user } = useContext(AuthContext);

  const { data: sellers = [], isLoading, refetch } = useQuery({
    queryKey: ['mySellers', user?.email],
    queryFn: async () => {
      const res = await fetch(`https://used-products-resale-server.vercel.app/allSellers?email=${user?.email}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      const data = await res.json();
      return data;
    }
  })

  if (isLoading) {
    return <Loader></Loader>
  }


  const handleSellerVerify = (sellerEmail) => {
    fetch(`https://used-products-resale-server.vercel.app/verifySeller/${sellerEmail}?email=${user?.email}`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        refetch();
      })
  };

  const handleSellerDelete = id => {
    const permission = window.confirm('Are Your sure you want to delete?')
    if (permission) {
      fetch(`https://used-products-resale-server.vercel.app/seller/${id}?email=${user?.email}`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          refetch();
        })
    }
  }

  return (
    <div>
      <h2 className="text-3xl mb-5 font-semibold">All Sellers</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Name</th>
              <th>Email</th>
              <th>verify</th>
              <th>delete</th>
            </tr>
          </thead>

          <tbody>
            {
              sellers?.map((seller, index) =>
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{seller?.name}</td>
                  <td>{seller?.email}</td>
                  <td>
                    {
                      !seller?.verify && <button onClick={() => handleSellerVerify(seller?.email)} className='btn btn-secondary btn-sm'>verify seller</button>
                    }
                    {
                      seller?.verify === true && <p><CheckBadgeIcon className='h-6 w-6 text-green-500' /> </p>
                    }
                  </td>
                  <td><button onClick={() => handleSellerDelete(seller._id)}><TrashIcon className='h-10 w-10 text-red-400' /></button></td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllSellers;