import React, { useContext, useEffect, useState } from 'react';
import { BiLockAlt, BiChevronRightCircle, BiUser, BiMailSend, } from "react-icons/bi";
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import useToken from '../../hooks/UseToken';
import toast from 'react-hot-toast';
import useTittle from '../../hooks/useTittle';
import { GoogleAuthProvider } from 'firebase/auth';
import { FcGoogle } from "react-icons/fc";
import logo from '../../assets/image/logo.png';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const SignUp = () => {
  useTittle('SignUp')
  const { createUser, updateUser, googleLogin } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();
  const [signInLoading, setSignInLoading] = useState(false);
  const [toggle, setToggle] = useState(false);


  const [createdUserEmail, setCreatedUserEmail] = useState('');
  const [token] = useToken(createdUserEmail);
  
  useEffect(() => {
    if (token) {
      navigate('/');
      setSignInLoading(false);
    }
  }, [token])

  // create user
  const handleSignUp = data => {
    setSignInLoading(true);
    const name = data.name;
    const email = data.email;
    const password = data.password;
    const role = data.role;

    createUser(email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        handleProfileUpdate(name, email, role);
      })
      .catch(error => {
        setSignInLoading(false);
        toast.error(error.message)
      })
  };

  // update user profile
  const handleProfileUpdate = (name, email, role) => {
    const profile = {
      displayName: name,
    };

    updateUser(profile)
      .then(() => {
        saveUser(name, email, role)
      })
      .catch(error => {
        setSignInLoading(false);
        toast.error(error.message);
      })
  };

  // save user info
  const saveUser = (name, email, role) => {
    const user = { name, email, role };

    fetch('https://used-products-resale-server.vercel.app/users', {
      method: "POST",
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        if (data.acknowledged) {
          toast.success('successfully create user')
          setCreatedUserEmail(email)
          setSignInLoading(false);
        }
      })
  };

  const handleGoogleSignIn = () => {
    googleLogin(googleProvider)
      .then(result => {
        const user = result.user;
        console.log(user);

        const userData = {
          name: user?.displayName,
          email: user?.email,
          role: 'bearer',
        };

        fetch('https://used-products-resale-server.vercel.app/users', {
          method: "POST",
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(userData)
        })
          .then(res => res.json())
          .then(data => {
            console.log(data)
            if (data.acknowledged) {
              toast.success('successfully create user')
              setCreatedUserEmail(user?.email)
            }
          })

      })
      .catch(error => {
        toast.error(error.message)
      })
  };

  return (
    <div className='bg-[#E5E7EB] w-full'>
      <div className='flex justify-center py-10'>
        <div className='w-[80%] md:w-[40%] lg:w-[30%] bg-white shadow-md p-7 rounded-md'>
          <Link to='/' className=''>
            <img src={logo} className='w-[60px] mb-2 mx-auto' alt="" />
          </Link>

          <h2 className='text-2xl font-semibold text-center mb-3'>Create a new account</h2>

          <form onSubmit={handleSubmit(handleSignUp)}>
            <div className="my-4">
              <label htmlFor="role" className='text-sm  tracking-wide text-gray-600'>Select the user type</label>
              <select {...register('role')} className="select select-sm  rounded-md border-gray-400 w-full focus:outline-none">
                <option>Buyer</option>
                <option>Seller</option>
              </select>
            </div>


            <div className='mb-4'>
              <label htmlFor="name" className='text-sm tracking-wide text-gray-600'>Full Name</label>
              <div className='relative'>
                <div className='inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400 '> <BiUser /> </div>
                <input type="text"
                  {...register("name", {
                    required: "name is required"
                  })}
                  className='pl-10 border text-sm placeholder-gray-500   rounded-md border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 ' />
              </div>
              {errors.name && <p className='text-red-600 text-xs'>*{errors.name?.message}</p>}
            </div>

            <div className='mb-4'>
              <label htmlFor="email" className=' text-sm tracking-wide text-gray-600'>E-Mail Address:</label>
              <div className='relative'>
                <div className='inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400 '> <BiMailSend /> </div>
                <input type="email"
                  {...register("email", {
                    required: "email is required"
                  })}
                  className='pl-10 border text-sm placeholder-gray-500   rounded-md border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 ' />
              </div>
              {errors.email && <p className='text-red-600 text-xs'>*{errors.email?.message}</p>}
            </div>

            <div className='my-4'>
              <label htmlFor="password" className='text-sm tracking-wide text-gray-600'>Password:</label>
              <div className='relative'>
                <div className='inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400 '> <BiLockAlt /> </div>
                <input type={toggle ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "password must be 6 character" }
                  })}
                  className='pl-10 border text-sm placeholder-gray-500   rounded-md border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 ' />
                  <div onClick={() => setToggle(!toggle)} className='inline-flex items-center justify-center absolute right-0 top-0 h-full w-10 text-gray-400 cursor-pointer'> {toggle ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}  </div>
              </div>
              {errors.password && <p className='text-red-600 text-xs'>*{errors.password?.message}</p>}
            </div>

            <button className={signInLoading ? ' bg-blue-600 cursor-not-allowed text-white duration-300 w-full h-10 rounded-md' : 'bg-blue-700 hover:bg-blue-800 text-white duration-300 w-full h-10 rounded-md'}>{signInLoading ? 'Sign Up...' : 'Sign Up'}</button>
            <p className='mt-2'>Already have an Account? <Link to='/login' className='hover:underline'>Login</Link></p>
          </form>

          <div className='divider'>or</div>

          <button onClick={handleGoogleSignIn} className='bg-slate-700 hover:bg-slate-800 duration-300 w-full h-10 rounded-md'>
            <span className='text-white'>Continue with</span>
            <FcGoogle className='h-6 w-6 ml-5 cursor-pointer inline-block  ' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;