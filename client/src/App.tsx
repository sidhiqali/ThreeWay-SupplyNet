import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';
import NewOrder from './pages/NewOrder';
import UserProvider from './context/userContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Message from './pages/Message';

const App = () => {
  const queryClient = new QueryClient();
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <div className=''>
          <Router>
            <div className='container'>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />
                <Route path='/newOrder' element={<NewOrder />} />
                <Route path='/message/:id' element={<Message />} />
                <Route path='*' element={<PageNotFound />} />
              </Routes>
            </div>
          </Router>
        </div>
      </QueryClientProvider>
    </UserProvider>
  );
};

export default App;
