import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../context/userContext';
import newRequest from '../utils/newRequest';
import { toast } from 'react-toastify';
const Header = () => {
  const { user, setUser } = useContext(userContext);

  //logout button
  const handleLogout = async () => {
    try {
      await newRequest.post('/user/logout');
      setUser(null);
      toast.success('logged out');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={`header-section bg-main bg-cover z-50 top-0 `}>
      <div className='nav-section transition-all ease  flex items-center text-yellow-500 justify-between py-4 px-8 sm:px-24 bg-transparent'>
        <div className='flex justify-center items-center w-36'>
          <Link to='/'>
            <div className='text-2xl font-bold text-yellow-700'>SupplyNet</div>
          </Link>
        </div>
        {user ? (
          <div className='hidden md:flex text-yellow-600'>
            {user?.isTransporter ? (
              <div>Transporter Dashboard</div>
            ) : (
              <div>Manufacturer Dashboard</div>
            )}
          </div>
        ) : (
          ''
        )}
        <div className='cursor-pointer items-center flex justify-between '>
          {!user && (
            <Link to='/login'>
              {' '}
              <button className='relative w-16 md:w-24 h-8 md:h-10 inline-flex items-center justify-center p-0.5 mb-2 mr-5 overflow-hidden text-sm font-medium  rounded-lg group border border-gradient-to-br from-red-800 via-yellow-800 to-yellow-800 group-hover:from-red-800 group-hover:via-red-700 group-hover:to-yellow-600 focus:ring-4 focus:outline-none focus:ring-red-100 '>
                <span className='relative bg-transparent px-5 py-2.5 transition-all ease-in duration-75 text-yellow-600  rounded-md group-hover:bg-opacity-0 hover:text-white'>
                  Login
                </span>
              </button>
            </Link>
          )}

          {!user && (
            <Link to='/signup'>
              <button
                type='button'
                className=' w-20 md:w-24 h-8 md:h-10 focus:outline-none text-white bg-yellow-700 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-2 md:px-5  mr-2 mb-2 dark:focus:ring-yellow-900'
              >
                Register
              </button>
            </Link>
          )}
          {user && (
            <div className='flex items-center justify-center'>
              <span className='mx-8'>{user.username}</span>

              <button
                className='w-16 md:w-20 h-8 md:h-10 focus:outline-none text-white bg-yellow-700 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-2 md:px-5  mr-2 mb-2 dark:focus:ring-yellow-900'
                type='button'
                onClick={() => {
                  handleLogout();
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
