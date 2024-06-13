import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import useToken from '../../hooks/UseToken';
import toast from 'react-hot-toast';
import useTittle from '../../hooks/useTittle';
import { GoogleAuthProvider } from 'firebase/auth';
import logo from '../../assets/image/logo.png';
import { FcGoogle } from "react-icons/fc";
import { BiLockAlt, BiUser, BiMailSend, } from "react-icons/bi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  useTittle('Login')
  const { signIn, googleLogin } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [signInLoading, setSignInLoading] = useState(false);
  const googleProvider = new GoogleAuthProvider();
  const [toggle, setToggle] = useState(false);

  const location = useLocation();
  const navigate = useNavigate()
  const from = location.state?.from?.pathname || '/';

  const [loginUserEmail, setLoginUserEmail] = useState(null);
  const [token] = useToken(loginUserEmail);

  useEffect(() => {
    if (token) {
      setSignInLoading(false)
      navigate(from, { replace: true });
    }
  }, [token])

  // email & password login
  const handleLogin = data => {
    setSignInLoading(true);
    const email = (data?.email)
    const password = (data?.password)

    signIn(email, password)
      .then(result => {
        const user = result.user;
        setLoginUserEmail(user?.email)
      })
      .catch(error => {
        toast.error(error.message)
        setSignInLoading(false);
      })
  };

  const handleGoogleSignIn = (e) => {
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
              setLoginUserEmail(user?.email)
            }
          })

      })
      .catch(error => {
        toast.error(error.message)
      })
  };

  return (
    <div className='flex justify-center items-center bg-[#E5E7EB] pb-14'>
      <div className='w-[80%] md:w-[40%] lg:w-[30%] p-7 border bg-white text-black rounded-md my-10'>
        <Link to='/' className=''>
          <img src={logo} className='w-[60px] mb-2 mx-auto' alt="" />
        </Link>

        <h2 className='text-2xl font-semibold text-center mb-3'>Login To Your Account</h2>

        <form onSubmit={handleSubmit(handleLogin)}>
          <div className='mb-4'>
            <label htmlFor="email" className=' text-sm tracking-wide text-gray-600'>E-Mail Address:</label>
            <div className='relative'>
              <div className='inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400 '> <BiMailSend /> </div>
              <input type="email"
                {...register("email", {
                  required: "Email Address is required"
                })}
                className='pl-10 border text-sm placeholder-gray-500   rounded-md border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 ' />
            </div>
            {errors.email && <p className='text-red-600 text-sm'>*{errors.email?.message}</p>}
          </div>

          <div className='my-4'>
            <label htmlFor="password" className='text-sm tracking-wide text-gray-600'>Password:</label>
            <div className='relative'>
              <div className='inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400 '> <BiLockAlt /> </div>
              <input type={toggle ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: 'Password must be 6 characters or longer'
                  }
                })}
                className='pl-10 border text-sm placeholder-gray-500   rounded-md border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 ' />
              <div onClick={() => setToggle(!toggle)} className='inline-flex items-center justify-center absolute right-0 top-0 h-full w-10 text-gray-400 cursor-pointer'> {toggle ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}  </div>
            </div>
            {errors.password && <p className='text-red-600 text-sm'>*{errors.password?.message}</p>}
          </div>


          <p className='mb-4 tex'>Forget Password?</p>

          <button className={signInLoading ? ' bg-blue-600 cursor-not-allowed text-white duration-300 w-full h-10 rounded-md' : 'bg-blue-700 hover:bg-blue-800 text-white duration-300 w-full h-10 rounded-md'}>{signInLoading ? 'Login...' : 'Login'}</button>
        </form>

        <p className='my-3 text-sm text-center'>New to Buy & Resale? <Link className='hover:underline' to="/signup">Create an Account</Link></p>

        <div className="divider">OR</div>

        <button onClick={handleGoogleSignIn} className='bg-slate-700 hover:bg-slate-800 duration-300 w-full h-10 rounded-md'>
          <span className='text-white'>Continue with</span>
          <FcGoogle className='h-6 w-6 ml-5 cursor-pointer inline-block  ' />
        </button>
      </div>
    </div>
  );
};

export default Login;