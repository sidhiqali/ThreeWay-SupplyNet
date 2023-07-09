import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { userContext } from '../context/userContext';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import newRequest from '../utils/newRequest';
import Loader from '../utils/Loader';
import avatar from '../assets/avatar.png';
import io, { Socket } from 'socket.io-client';
import Header from '../components/Header';
import { IMessage } from '../utils/interface';

const Message = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useContext(userContext);
  const [desc, setDesc] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const queryClient = useQueryClient();
  const [socket, setSocket] = useState<Socket | null>(null);

  // Fetch all messages in a conversation
  const { isLoading, error, data } = useQuery<IMessage[]>(
    ['messages', id],
    () => newRequest.get(`/messages/${id}`).then((res) => res.data)
  );

  // Fetch data of opposite chatting user
  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: receiver,
  } = useQuery(['user', receiverId], async () => {
    const res = await newRequest(`user/${receiverId}`);
    return res.data;
  });

  //sending messages
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = {
      conversationId: id,
      userId: user?._id,
      desc,
    };
    socket?.emit('chat:message', message);
    setDesc('');
  };

  // Finding userId of opposite user
  useEffect(() => {
    if (data && data.length > 0) {
      const foundBuyerId = data.find((m) => m.userId !== user?._id)?.userId;
      if (foundBuyerId) {
        setReceiverId(foundBuyerId);
      }
    }
  }, [data, user?._id]);

  useEffect(() => {
    const socket = io('http://localhost:5000');
    setSocket(socket);
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on(`chat:message:${id}`, (message: IMessage) => {
        queryClient.setQueryData<IMessage[]>(['messages', id], (prevData) => {
          if (prevData) {
            return [...prevData, message];
          }
          return [message];
        });
      });
    }
    return () => {
      if (socket) {
        socket.off(`chat:message:${id}`);
      }
    };
  }, [socket, id, queryClient]);

  return (
    <>
      <Header />
      <div className='min-h-screen bg-main bg-cover bg-no-repeat px-14 lg:px-40 py-8'>
        <div className='flex flex-col'>
          <span className='breadcrumbs text-white'>
            <Link className='my-10 text-yellow-400' to='/'>
              Messages
            </Link>
            {'>'} {receiver?.username} {'>'}
          </span>
          {isLoading ? (
            <Loader />
          ) : error ? (
            'error'
          ) : (
            <div className='overflow-y-auto h-[500px] border bg-transparent py-6 flex flex-col justify-end px-4 mx-4 rounded-md mt-8'>
              {data?.map((m, index) => (
                <div className='flex mb-4' key={index}>
                  {m.userId === user?._id ? (
                    <div className='flex w-full items-center justify-end'>
                      <p className='max-w-[90%] p-3 bg-blue-500 text-sm md:text-large text-white rounded-tl-md rounded-br-md'>
                        {m.desc}
                      </p>
                      <img
                        src={avatar}
                        alt='image'
                        className='w-10 h-10 rounded-full ml-3'
                      />
                    </div>
                  ) : isLoadingUser ? (
                    <Loader />
                  ) : errorUser ? (
                    'user not found'
                  ) : (
                    <>
                      <img
                        src={avatar}
                        alt='image'
                        className='w-10 h-10 rounded-full mr-3'
                      />
                      <p className='max-w-[70%] p-3 rounded-tr-md rounded-bl-md bg-white text-black'>
                        {m.desc}
                      </p>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
          <form
            className='write flex items-center justify-between px-10 mt-6 group'
            onSubmit={handleSubmit}
          >
            <textarea
              name='message'
              placeholder='write a message'
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className='w-10/12 h-14 p-3 text-white bg-transparent border border-gray-400 rounded-l-md grow'
            />
            <button
              type='submit'
              className='bg-yellow-500 h-14 px-4 py-2 text-white font-medium rounded-r-md'
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Message;
