import React, { useContext } from "react";
import {
  UserCircleIcon,
  PhoneIcon,
  MapPinIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/solid";
import { AuthContext } from "../../../Context/AuthProvider";
import useBuyer from "../../../hooks/UseBuyer";
import useAdmin from "../../../hooks/UseAdmin";
import useSeller from "../../../hooks/UseSeller";
import { toast } from "react-hot-toast";

const ProductListView = ({ product, setProduct }) => {
  const { user } = useContext(AuthContext);
  const {
    _id,
    verify,
    productName,
    image,
    originalPrice,
    resalePrice,
    sellerName,
    location,
    description,
    phoneNumber,
    quality,
    purchaseTime,
    usedTime,
    available,
    advertise,
    postTime,
  } = product;
  const { todayDate, month, year, hour, minute, seconds } = postTime;
  const [isBuyer] = useBuyer(user?.email);
  const [isAdmin] = useAdmin(user?.email);
  const [isSeller] = useSeller(user?.email);

  return (
    <div className="mb-10">
      <div className="grid md:grid-cols-4 gap-5 md:p-7 rounded-lg border border-slate-300 hover:shadow-xl transition-shadow">
        <img
          src={image}
          className="md:h-[280px] lg:h-[200px]  col-span-4 md:col-span-2 lg:col-span-1"
          alt=""
        />

        <div className="col-span-4 md:col-span-2 lg:col-span-3 grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5 pb-10 p-5">
          <div className="space-y-1 md:border-r-2 md:pr-2">
            <h2 className="text-2xl font-semibold"> {productName} </h2>
            <div className="flex items-center gap-4 font-semibold">
              <p className="text-blue-500 font-bold text-xl">
                {resalePrice} TK
              </p>
              <del>{originalPrice}Tk</del>
            </div>
            <p>
              {description.length > 100
                ? description.slice(0, 100) + "..."
                : description}
            </p>
            <div className="pt-2">
              <label
                onClick={() => setProduct(product)}
                htmlFor={isBuyer || !user ? "product-order-modal" : "xyz"}
                className={
                  isAdmin || isSeller
                    ? "btn btn-sm mr-2 bg-slate-600 disabled hover:cursor-not-allowed"
                    : "btn btn-sm mr-2 btn-primary"
                }
              >
                {" "}
                Book Now{" "}
              </label>
              {/* <button onClick={() => handleReportToAdmin(_id)} className='mt-2 md:mt-0 border rounded-md px-4 py-1 bg-red-300 text-black font-semibold'>Report Product</button> */}
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex">
              <UserCircleIcon className="h-12 w-12 inline-block mr-2" />
              <div>
                <p>
                  {" "}
                  <span className="font-semibold text-md">
                    {sellerName}
                  </span>{" "}
                  {verify && (
                    <CheckBadgeIcon className="h-4 w-4 text-indigo-600 inline-block" />
                  )}
                </p>
                <p className="text-xs">
                  Post Data: {todayDate > 0 && `${todayDate}-${month}-${year}`}{" "}
                  {`${hour} ${minute}h ${seconds}s`}
                </p>
              </div>
            </div>
            <p className="ml-3">
              <PhoneIcon className="h-4 w-4 inline-block mr-2" /> {phoneNumber}
            </p>
            <p className="ml-3">
              <MapPinIcon className="h-4 w-4 inline-block mr-2" /> {location}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListView;

// const handleReportToAdmin = id => {
//   fetch(`https://used-products-resale-server.vercel.app/productReport/${id}`, {
//     method: 'PUT',
//     headers: {
//       authorization: `Bearer ${localStorage.getItem('accessToken')}`
//     }
//   })
//     .then(res => res.json())
//     .then(data => {
//       if (data.acknowledged) {
//         toast.success('Report get successful')
//       }
//     })
// };
