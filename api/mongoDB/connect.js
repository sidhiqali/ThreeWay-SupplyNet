import mongoose from 'mongoose';

const connectDB = async (url) => {
  mongoose.set('strictQuery', true);
  mongoose
    .connect(url)
    .then(() => {
      console.log('mongodb connected');
    })
    .catch((err) => console.log(err));
};

export default connectDB;
