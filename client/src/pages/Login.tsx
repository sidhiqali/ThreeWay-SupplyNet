import React, { Fragment, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import newRequest from '../utils/newRequest';
import { userContext } from '../context/userContext';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {setUser } = useContext(userContext);

  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };
  
  //handle login 
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await newRequest.post(
        'user/login',
        {
          username,
          password,
        },
        config
      );
      if (result) {
        setUser(result.data);
        console.log(result.data);
        toast.success('Login successfully');
        navigate('/');
      } else {
        toast.error('Invalid response');
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data || 'An error occurred'); // Display the error message using toast.error
    }
  };

  return (
    <Fragment>
      <Header />
      <div className='flex min-h-[calc(100vh-137px)] bg-main bg-no-repeat bg-cover flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <div className=' text-center text-2xl font-bold leading-9 tracking-tight text-slate-400'>
            SupplyNet
          </div>
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-slate-500'>
            Sign in to your account
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form
            className='space-y-6'
            action='#'
            method='POST'
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor='username'
                className='block  font-medium leading-6 text-gray-500'
              >
                Username
              </label>
              <div className='mt-1'>
                <input
                  className='block w-full text-white bg-transparent border-2 border-gray-400 h-12 rounded-md  px-3 text-sm focus:border-yellow-500 focus:outline-none '
                  type='text'
                  required
                  name='username'
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='block font-medium leading-6 text-gray-500'
                >
                  Password
                </label>
              </div>
              <div className='mt-1'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className='block w-full text-white bg-transparent border-2 border-gray-400 h-12 rounded-md  px-3 text-sm focus:border-yellow-500 focus:outline-none'
                />
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='flex w-full justify-center items-center h-12 rounded-md bg-yellow-600 px-3 py-1.5  font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Login
              </button>
            </div>
          </form>

          <div className=' mt-5 text-sm flex items-center'>
            <div className='text-gray-500 text-lg'>
              Already have an account ?
            </div>
            <Link to='/signup'>
              <div className='font-semibold text-yellow-800 hover:text-yellow-600 mx-2 text-lg'>
                Signup
              </div>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Login;
