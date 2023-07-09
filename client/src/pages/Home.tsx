import React from 'react';
import Manufacturer from './Manufacturer';
import Transporter from './Transporter';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { userContext } from '../context/userContext';
const Home = () => {
  const { user } = useContext(userContext);
  console.log(user);

  return (
    <div
      className={`h-[100vh] bg-no-repeat bg-cover w-screen ${
        !user ? 'bg-hero' : ''
      }`}
    >
      <Header />

      {!user ? (
        <div className='flex flex-col px-14 text-slate-300 max-w-full sm:max-w-[80%] lg:max-w-[50%] h-[85vh]  justify-center'>
          <h1 className='text-5xl font-bold   leading-relaxed'>
            Welcome to SupplyNet Dashboard
          </h1>
          <div className='buttons flex py-8'>
            <Link to='/login'>
              <button
                type='button'
                className='text-white w-28 bg-yellow-700 hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-5 mb-2 dark:focus:ring-yellow-900'
              >
                Login
              </button>
            </Link>
            <Link to='/signup'>
              <button
                type='button'
                className='text-white w-28 bg-transparent border-yellow-600 border hover:bg-yellow-800 focus:outline-yellow-700 focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900'
              >
                Signup
              </button>
            </Link>
          </div>
        </div>
      ) : user?.isTransporter ? (
        <Transporter />
      ) : (
        <Manufacturer />
      )}
    </div>
  );
};

export default Home;
