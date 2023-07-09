import React, { Fragment, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import newRequest from '../utils/newRequest';
import { IOrder } from '../utils/interface';
import Loader from '../utils/Loader';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const NewOrder = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [transporterId, setTransporterId] = useState<string>('');
  const [newOrder, setNewOrder] = useState<IOrder>({
    from: '',
    to: '',
    quantity: 0,
  });

//finding only transporters to select for manufacturer
  const { isLoading, error, data } = useQuery({
    queryKey: ['transporters'],
    queryFn: () => {
      return newRequest.get('user/transporters').then((res) => res.data);
    },
  });

//order creation. because of mutation order automatically rendered in order section
  const mutation = useMutation({
    mutationFn: (order: IOrder) => {
      return newRequest.post(`/order`, order);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['orders']);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewOrder((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({ ...newOrder, transporterId });
    navigate('/');
    toast.success('Order created successfully');
  };

  return (
    <Fragment>
      <Header />
      <div className='flex min-h-[calc(100vh-137px)] bg-main bg-no-repeat bg-cover flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-slate-500'>
            Create new Order
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
                htmlFor='from'
                className='block  font-medium leading-6 text-gray-500'
              >
                From
              </label>
              <div className='mt-1'>
                <input
                  className='block w-full text-white bg-transparent border-2 border-gray-400 h-12 rounded-md  px-3 text-sm focus:border-yellow-500 focus:outline-none '
                  required
                  name='from'
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='to'
                className='block  font-medium leading-6 text-gray-500'
              >
                TO
              </label>
              <div className='mt-1'>
                <input
                  className='block w-full text-white bg-transparent border-2 border-gray-400 h-12 rounded-md  px-3 text-sm focus:border-yellow-500 focus:outline-none '
                  required
                  name='to'
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor='quantity'
                className='block  font-medium leading-6 text-gray-500'
              >
                Quantity in Ton
              </label>
              <div className='mt-1'>
                <div className='mt-1'>
                  <input
                    className='block w-full text-white bg-transparent border-2 border-gray-400 h-12 rounded-md  px-3 text-sm focus:border-yellow-500 focus:outline-none '
                    required
                    name='quantity'
                    type='number'
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor='transporter'
                className='block  font-medium leading-6 text-gray-500'
              >
                Transporter
              </label>
              {isLoading ? (
                <Loader />
              ) : error ? (
                'some error occured'
              ) : (
                <div className='mt-1'>
                  <select
                    className='block w-full text-yellow-600 bg-transparent border-2 border-gray-400 h-12 rounded-md  px-3 text-sm focus:border-yellow-500 focus:outline-none '
                    required
                    name='transporterId'
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setTransporterId(e.target.value)
                    }
                  >
                    <option value=''>Select transporter</option>
                    {data.map((transporter: any) => (
                      <option key={transporter._id} value={transporter._id}>
                        {transporter?.username}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div>
              <button
                type='submit'
                className='flex w-full justify-center items-center h-12 rounded-md bg-yellow-600 px-3 py-1.5  font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Create New Order
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default NewOrder;
