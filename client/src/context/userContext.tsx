import { createContext, useEffect, useState, ReactNode } from 'react';
import { User } from '../utils/interface';

interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const userContext = createContext<UserContextProps>({
  user: null,
  setUser: () => {},
});

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Set user from local storage
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser) as User;
      setUser(parsedUser);
    }
  }, []);

  // Set local storage from user data
  useEffect(() => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [user]);

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;
