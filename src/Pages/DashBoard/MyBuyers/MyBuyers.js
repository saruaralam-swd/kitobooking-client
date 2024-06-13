import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import Loader from '../../../Components/Loader';
import { AuthContext } from '../../../Context/AuthProvider';

const MyBuyers = () => {
  const { user } = useContext(AuthContext);

  const { data: buyers = [], isLoading } = useQuery({
    queryKey: ['myBuyers', user?.email],
    queryFn: async () => {
      const res = await fetch(`https://used-products-resale-server.vercel.app/myBuyers?email=${user?.email}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      const data = await res.json();
      return data;
    }
  });

  if (isLoading) {
    return <Loader></Loader>
  }


  return (
    <div>
      <h2 className="text-3xl mb-5 font-semibold">My Buyers</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">

          <thead>
            <tr>
              <th>S/N</th>
              <th>Name</th>
              <th>Email</th>
              <th>phone</th>
              <th>purchased product</th>
            </tr>
          </thead>
          <tbody>
            {
              buyers?.map((buyer, index) =>
                <tr key={buyer._id}>
                  <th>{index + 1}</th>
                  <td>{buyer?.name}</td>
                  <td>{buyer?.email}</td>
                  <td>{buyer?.phoneNumber}</td>
                  <td>{buyer?.productName}</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBuyers;