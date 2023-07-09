import React, { Fragment, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { User } from '../utils/interface';
import newRequest from '../utils/newRequest';
import { userContext } from '../context/userContext';
import { toast } from 'react-toastify';

const Signup = () => {
  const { setUser } = useContext(userContext);
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState<User>({
    username: '',
    email: '',
    password: '',
    isTransporter: false,
    address: '',
  });

  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  //handle signup
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await newRequest.post('/user/register', newUser, config);
      setUser(result?.data?.info);
      navigate('/');
      toast.success('user created successfully');
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data || 'An error occurred');
    }
  };
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleTransporter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser((prev) => {
      return { ...prev, isTransporter: e.target.checked };
    });
  };

  return (
    <Fragment>
      <Header />
      <div className='flex min-h-[calc(100vh-140px)] bg-main bg-no-repeat bg-cover flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-slate-400'>
            Signup your account
          </h2>
        </div>

        <div className='mt-6 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form
            className='space-y-6'
            action='#'
            method='POST'
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor='username'
                className='block  font-medium leading-6 text-gray-300'
              >
                Username
              </label>
              <div className=''>
                <input
                  className='block w-full bg-transparent text-white border-2 border-gray-400 h-10 rounded-md  px-3 text-sm focus:border-yellow-500 focus:outline-none '
                  type='text'
                  required
                  name='username'
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor='email'
                className='block  font-medium leading-6 text-gray-300'
              >
                Email
              </label>
              <div className=''>
                <input
                  className='block h-10 w-full bg-transparent text-white border-2 border-gray-400 rounded-md  px-3 text-sm focus:border-yellow-500 focus:outline-none '
                  type='email'
                  required
                  name='email'
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor='address'
                className='block  font-medium leading-6 text-gray-300'
              >
                Address
              </label>
              <div className=''>
                <textarea
                  className='block h-[55px] w-full bg-transparent text-white border-2 border-gray-400 rounded-md  px-3 text-sm focus:border-yellow-500 focus:outline-none '
                  required
                  name='address'
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className='title flex items-center lg:my-5'>
              <span className='text-lg text-gray-300'>
                Become a Transporter
              </span>
              <div className='ml-3 flex items-center'>
                <label className='relative inline-flex items-center cursor-pointer border-2 rounded-xl'>
                  <input
                    type='checkbox'
                    value=''
                    className='sr-only peer'
                    onChange={handleTransporter}
                  />
                  <div className="w-10 h-6 bg-gray-200 peer-focus:outline-none  dark:peer-focus:ring--500 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-500" />
                </label>
              </div>
            </div>
            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='block font-medium leading-6 text-gray-300'
                >
                  Password
                </label>
              </div>
              <div className=''>
                <input
                  id='password'
                  name='password'
                  type='password'
                  required
                  onChange={handleChange}
                  className='block w-full bg-transparent text-white border-2 border-gray-400 h-10 rounded-md  px-3 text-sm focus:border-yellow-600 focus:outline-none'
                />
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='flex w-full justify-center items-center h-12 rounded-md bg-yellow-600 px-3 py-1.5  font-semibold leading-6 text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Signup
              </button>
            </div>
          </form>

          <div className=' mt-5 text-sm flex items-center'>
            <div className='text-gray-500 text-lg'>
              Already have an account ?
            </div>
            <Link to='/signup'>
              <div className='font-semibold text-yellow-600 hover:text-yellow-500 mx-2 text-lg'>
                Login
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Signup;
