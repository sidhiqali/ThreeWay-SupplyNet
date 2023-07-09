import React, { useContext, Fragment, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../context/userContext';
import newRequest from '../utils/newRequest';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { IOrder, User } from '../utils/interface';
import Loader from '../utils/Loader';
import { MdSearch } from 'react-icons/md';

const OrderSection = () => {
  const { user } = useContext(userContext);
  const [nameId, setNameId] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  //fetch all orders
  const { isLoading, error, data } = useQuery({
    queryKey: ['orders', search],
    queryFn: () => {
      const queryParams = new URLSearchParams();
      if (search) queryParams.append('search', search);
      const queryString = queryParams.toString();
      const url = `/order${queryString ? `?${queryString}` : ''}`;
      return newRequest(url).then((res) => res.data);
    },
  });

  //fetch details of manufacturer or Transporter
  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ['users', nameId],
    queryFn: () => {
      return Promise.all(
        nameId
          .filter((id) => id)
          .map((id) => newRequest(`user/${id}`).then((res) => res.data))
      );
    },
    enabled: !!nameId,
  });

  //fetch user id of manufacturer or Transporter from order details
  useEffect(() => {
    if (data && data.length > 0) {
      const nameIds = data.map((c: IOrder) =>
        user?.isTransporter ? c.manufactureId : c.transporterId
      );
      console.log(nameIds);
      setNameId(nameIds);
    }
  }, [data, user?.isTransporter]);
  const handleSearch = () => {
    queryClient.invalidateQueries(['orders', search]);
  };

  //Reply to an order  (only for Transporter)
  const handleReply = async (order: IOrder) => {
    const transporterId: any = order.transporterId;
    const manufactureId: any = order.manufactureId;
    const id = transporterId + manufactureId;

    //fetch previous message if had conversation before
    try {
      const res = await newRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
      console.log(res?.data);
    } catch (err: unknown) {
      if (typeof err === 'object' && err !== null) {
        const error = err as { response?: { status: number } };
        if (error.response && error.response.status === 404) {
          // create new conversation if it's the first time
          const res = await newRequest.post(`/conversations`, {
            receiver: user?.isTransporter ? manufactureId : transporterId,
          });
          console.log(res?.data);

          navigate(`/message/${res.data.id}`);
        }
      }
    }
  };

  return (
    <div className='w-full'>
      <div className='head sm:flex items-center justify-between py-4'>
        <div className=' text-white pl-10 md:pl-1 text-2xl font-semibold'>
          Orders
        </div>
        <div className='mx-5 sm:mx-10 max-w-5xl flex p-5'>
          <input
            placeholder='Search From or To here ....'
            type='text'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='md:w-44 w-40 bg-transparent text-white xl:w-[450px] h-12 rounded-l-md rounded-r-none border  border-yellow-900 p-4'
          />
          <MdSearch
            className='cursor-pointer w-14 md:w-[75px] h-12 rounded-r-md  bg-yellow-700 text-white p-2'
            onClick={handleSearch}
          />
        </div>
        {user?.isTransporter ? (
          ''
        ) : (
          <Link to='/newOrder'>
            <button
              type='button'
              className=' w-28 ml-10 md:w-28 h-8 md:h-10 focus:outline-none text-white bg-yellow-700 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-2 md:px-5  mr-2  dark:focus:ring-yellow-900'
            >
              New Order
            </button>
          </Link>
        )}
      </div>
      <div className='relative overflow-x-auto bg-transparent md:min-h-[400px] border shadow-md sm:rounded-lg py-3'>
        <table className=' w-full bg-transparent text-sm text-left text-slate-200 '>
          <thead className='text-sm text-yellow-700 uppercase'>
            <tr className=''>
              {user?.isTransporter ? (
                <th scope='col' className='px-6 py-3'>
                  Manufacturer
                </th>
              ) : (
                <th scope='col' className='px-6 py-3'>
                  Transporter
                </th>
              )}
              <th scope='col' className='px-6 py-3'>
                From
              </th>
              <th scope='col' className='px-6 py-3'>
                To
              </th>
              <th scope='col' className='px-6 py-3'>
                Quantity
              </th>
              <th scope='col' className='px-6 py-3'>
                Pickup Address
              </th>
              {user?.isTransporter ? (
                <Fragment>
                  <th scope='col' className='px-6 py-3'>
                    Action
                  </th>
                </Fragment>
              ) : (
                ''
              )}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6}>
                  <div className='flex bg-transparent justify-center items-center'>
                    <Loader />
                  </div>
                </td>
              </tr>
            ) : error ? (
              'error.message'
            ) : (
              data.map((order: IOrder) => {
                let correspondingUser = undefined;
                if (dataUser && dataUser.length > 0) {
                  correspondingUser = dataUser.find((findUser) => {
                    return (
                      findUser._id ===
                      (user?.isTransporter
                        ? order.manufactureId
                        : order.transporterId)
                    );
                  });
                  console.log(correspondingUser);
                }
                return (
                  <tr key={order?.id} className=' py-3'>
                    {isLoadingUser ? (
                      <Loader />
                    ) : errorUser ? (
                      'errorUser.message'
                    ) : (
                      <th className='px-6 py-4 bg-transparent'>
                        {correspondingUser?.username}
                      </th>
                    )}
                    <td className='px-6 py-4 bg-transparent'>{order?.from}</td>
                    <td className='px-6 py-4 bg-transparent'>{order?.to}</td>
                    <td className='px-6 py-4 bg-transparent'>
                      {order?.quantity}
                    </td>
                    {order?.pickUpAddress && (
                      <td className='px-6 py-4 bg-transparent'>
                        {order.pickUpAddress.substring(0, 25)} ...
                      </td>
                    )}
                    {user?.isTransporter ? (
                      <button
                        className='w-16  h-8 text-sm focus:outline-none text-white bg-yellow-700 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg px-2 md:px-2  mr-2 mb-2 dark:focus:ring-yellow-900'
                        type='button'
                        onClick={() => {
                          handleReply(order);
                        }}
                      >
                        Reply
                      </button>
                    ) : (
                      ''
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderSection;
