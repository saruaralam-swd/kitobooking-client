import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loader from '../../../Components/Loader';

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState('');
  const [btnBlur, setBtnBlur] = useState(false);
  const [selectCategory, setSelectedCategory] = useState(0);

  const { data: categories = [], isLoading } = useQuery({
    queryKey: [''],
    queryFn: async () => {
      const res = await fetch('https://used-products-resale-server.vercel.app/categories');
      const data = await res.json();
      return data;
    }
  })

  if (isLoading) {
    return <Loader></Loader>
  }

  const category = categories.filter(c => c.categoryName === categoryName);
  const imageHostKey = process.env.REACT_APP_imageBb_Key;

  const handleAddProduct = data => {
    setBtnBlur(true);
    const image = data.image[0];
    const formData = new FormData()
    formData.append('image', image);

    if (category.length !== 1) {
      setBtnBlur(false)
      alert('Select product Category');
      return;
    }

    fetch(`https://api.imgbb.com/1/upload?key=${imageHostKey}`, {
      method: "POST",
      body: formData,
    })
      .then(res => res.json())
      .then(imgData => {
       
        if (imgData.success) {
          data.image = imgData?.data?.url;
          data.categoryName = categoryName;
          data.categoryId = category[0]?._id;
          data.sellerName = user?.displayName;
          data.sellerEmail = user?.email;
          data.available = true;
          data.advertise = false;
          data.verify = false;
          data.wishList = false;
          data.report = false;

          const date = {
            todayDate: new Date().getDate(),
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
            hour: new Date().getHours(),
            minute: new Date().getMinutes(),
            seconds: new Date().getSeconds(),
          }

          if (date.hour < 12) {
            date.hour = `${date.hour}am`
          }
          else if (date.hour > 12) {
            date.hour = `${date.hour - 12}pm`
          }
          else if (date.hour === 12) {
            date.hour = `${date.hour}pm`
          }
          data.postTime = date;

          fetch(`https://used-products-resale-server.vercel.app/product?email=${user?.email}`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(data)
          })
            .then(res => res.json())
            .then(productData => {
              console.log(productData);
              if (productData.acknowledged) {
                toast.success(`product ${data?.productName} is added successfully`)
                navigate('/dashboard/myProducts')
                setBtnBlur(false)
              }
              else {
                setBtnBlur(false)
              }
            })
        }
      })
  };


  return (
    <div className='mt-10'>
      <h2 className="text-3xl text-center font-semibold underline mb-5">Add Product</h2>
      <form onSubmit={handleSubmit(handleAddProduct)} className='px-10' >
        <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          <div>
            <label className="label text-sm font-semibold"><span className="label-text">Product Name</span></label>
            <input type="text" {...register('productName')} className='border border-indigo-500 focus:outline-1 focus:outline-indigo-600  w-full rounded-md px-4 py-1' required />
          </div>

          <div>
            <label className="label text-sm font-semibold"><span className="label-text">Product Image</span></label>
            <input type="file" {...register('image')} className="file-input file-input-sm file-input-bordered file-input-black w-full " />
            {/* <input type="file"  className='' /> */}
          </div>

          <div>
            <label className="label text-sm font-semibold"><span className="label-text">Category</span></label>
            <select {...register('categoryName')} onChange={(e) => setCategoryName(e.target.value)} className="select select-bordered w-full select-sm">
              <option disabled selected>select product category</option>
              {
                categories.map(category => <option key={category._id} >{category.categoryName}</option>)
              }
            </select>
          </div>


          <div>
            <label className="label text-sm font-semibold"><span className="label-text">Original Price</span></label>
            <input type="number" {...register('originalPrice')} className='border border-indigo-500 focus:outline-1 focus:outline-indigo-600  w-full rounded-md px-4 py-1' required />
          </div>

          <div>
            <label className="label text-sm font-semibold"><span className="label-text">Resale Price</span></label>
            <input type="number" {...register('resalePrice')} className='border border-indigo-500 focus:outline-1 focus:outline-indigo-600  w-full rounded-md px-4 py-1' required />
          </div>


          <div>
            <label className="label text-sm font-semibold"><span className="label-text">Product Quality</span></label>
            <select {...register('quality')} className="select select-bordered w-full select-sm">
              <option>Excellent</option>
              <option>Good</option>
              <option>Fair</option>
              <option>Low</option>
            </select>
          </div>

          <div>
            <label className="label text-sm font-semibold"><span className="label-text">Phone Number</span></label>
            <input type="number" {...register('phoneNumber')} placeholder='your phone number' className='border border-indigo-500 focus:outline-1 focus:outline-indigo-600  w-full rounded-md px-4 py-1' required />
          </div>

          <div>
            <label className="label text-sm font-semibold"><span className="label-text">Add your address</span></label>
            <input type="text" {...register('location')} placeholder='your address' className='border border-indigo-500 focus:outline-1 focus:outline-indigo-600  w-full rounded-md px-4 py-1' required />
          </div>

          <div>
            <label className="label text-sm font-semibold"><span className="label-text">Purchase Time</span></label>
            <input type="text" {...register('purchaseTime', {
              required: 'add when you buy this product'
            })} placeholder='when did you buy' className='border border-indigo-500 focus:outline-1 focus:outline-indigo-600  w-full rounded-md px-4 py-1' />
            {errors.purchaseTime && <p className='text-red-600 text-xs'>*{errors.purchaseTime?.message}</p>}
          </div>

          <div>
            <label className="label text-sm font-semibold"><span className="label-text">Used Time</span></label>
            <input type="text" {...register('usedTime', {
              required: 'add product use time'
            })} placeholder='How long have you been using it?' className='border border-indigo-500 focus:outline-1 focus:outline-indigo-600  w-full rounded-md px-4 py-1' />
            {errors.usedTime && <p className='text-red-600 text-xs'>*{errors.usedTime?.message}</p>}
          </div>

        </div>

        <div className='mt-5'>
          <textarea {...register('description')} className="textarea border-indigo-500 focus:outline-1 focus:outline-indigo-600 w-full text-lg placeholder:italic" placeholder="Product Description"></textarea>
        </div>

        <button disabled={btnBlur} className='btn btn-primary btn-md mt-5'>Add Now</button>
      </form>
    </div>
  );
};

export default AddProduct;