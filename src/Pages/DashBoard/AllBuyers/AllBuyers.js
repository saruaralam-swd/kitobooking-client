import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import Loader from '../../../Components/Loader';
import { AuthContext } from '../../../Context/AuthProvider';
import { CheckBadgeIcon, TrashIcon } from '@heroicons/react/24/solid'
import useTittle from '../../../hooks/useTittle';

const AllBuyers = () => {
  useTittle('All Buyers')
  const { user } = useContext(AuthContext);

  const { data: buyers = [], isLoading, refetch } = useQuery({
    queryKey: ['allBuyers', user?.email],
    queryFn: async () => {
      const res = await fetch(`https://used-products-resale-server.vercel.app/allBuyers?email=${user?.email}`, {
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


  const handleBuyerDelete = id => {
    const permission = window.confirm('Are Your sure you want to delete?')
    if (permission) {
      fetch(`https://used-products-resale-server.vercel.app/buyer/${id}?email=${user?.email}`, {
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
      <h2 className="text-3xl mb-5 font-semibold">All Buyers</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">

          <thead>
            <tr>
              <th>S/N</th>
              <th>Name</th>
              <th>delete</th>
            </tr>
          </thead>

          <tbody>
            {
              buyers?.map((buyer, index) =>
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{buyer?.email}</td>
                  <td><button onClick={() => handleBuyerDelete(buyer._id)}><TrashIcon className='h-10 w-10 text-red-400' /></button></td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBuyers;