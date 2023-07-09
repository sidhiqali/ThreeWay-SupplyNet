import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
import moment from 'moment';
import { userContext } from '../context/userContext';
import newRequest from '../utils/newRequest';
import avatar from '../assets/avatar.png';
import Loader from '../utils/Loader';
import { IOrder } from '../utils/interface';
const MessageSection = () => {
  const { user } = useContext(userContext);
  const [nameId, setNameId] = useState<string[]>([]);

  //fetch all conversations of user
  const { isLoading, error, data } = useQuery({
    queryKey: ['conversations'],
    queryFn: () =>
      newRequest.get(`/conversations`).then((res) => {
        return res.data;
      }),
  });

  //fetch user details of users to whom sending messages
  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
    refetch: refetchUserData,
  } = useQuery({
    queryKey: ['users', nameId],
    queryFn: () => {
      return Promise.all(
        nameId.map((id) => newRequest(`user/${id}`).then((res) => res.data))
      );
    },
    enabled: !!nameId,
  });

  //find userId from messages
  useEffect(() => {
    if (data && data.length > 0) {
      const nameIds = data.map((c: IOrder) =>
        user?.isTransporter ? c.manufactureId : c.transporterId
      );
      setNameId(nameIds);
    }
  }, [data, user?.isTransporter]);

  useEffect(() => {
    refetchUserData();
  }, [nameId, refetchUserData]);

  return (
    <div className=' h-full flex flex-col'>
      <div className='title flex items-center justify-center py-4 text-white text-2xl font-semibold'>
        <h1>Messages</h1>
      </div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        'error'
      ) : (
        <div className='relative overflow-x-auto border md:min-h-[400px] shadow-md bg-transparent text-slate-200 sm:rounded-lg '>
          {data.map((c: IOrder) => {
            let correspondingUser = undefined;
            if (dataUser && dataUser.length > 0) {
              correspondingUser = dataUser.find((findUser) => {
                return (
                  findUser._id ===
                  (user?.isTransporter ? c.manufactureId : c.transporterId)
                );
              });
              console.log(correspondingUser);
            }
            return (
              <Link to={`/message/${c.id}`}>
                <div className='cursor-pointer my-1 px-6 rounded-3xl bg-gray-950 bg-opacity-40  py-4 text-yellow-700 text-sm '>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center '>
                      <img
                        src={avatar}
                        alt='image'
                        className='w-10 h-10 rounded-full mx-3'
                      />
                      <div className='md:text-lg text-base  text-yellow-600'>
                        {isLoadingUser ? (
                          <Loader />
                        ) : errorUser ? (
                          'user not found'
                        ) : (
                          correspondingUser?.username
                        )}
                      </div>
                    </div>
                    <div className='text-sm md:text-[12px]'>
                      {moment(c.updatedAt).fromNow()}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MessageSection;
