import axios from 'axios';

const newRequest = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default newRequest;
