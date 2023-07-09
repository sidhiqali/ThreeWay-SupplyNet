import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './mongoDB/connect.js';
import userRoute from './routes/userRoute.js';
import conversationRoute from './routes/conversationRoute.js';
import messageRoute from './routes/messageRoute.js';
import orderRoute from './routes/orderRoute.js';
import cookieParser from 'cookie-parser';
import Message from './mongoDB/models/messageSchema.js';

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
  },
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use('/api/user', userRoute);
app.use('/api/conversations', conversationRoute);
app.use('/api/messages', messageRoute);
app.use('/api/order', orderRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong';
  console.error(err);
  res.status(errorStatus).send(errorMessage);
});

app.get('/', (req, res) => {
  res.send('api running successfully');
});

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('chat:message', (message) => {
    const { conversationId, userId, desc } = message;
    const newMessage = new Message({
      conversationId,
      userId,
      desc,
    });

    newMessage
      .save()
      .then((savedMessage) => {
        io.emit(`chat:message:${savedMessage.conversationId}`, savedMessage);
      })
      .catch((error) => {
        console.error('Error saving chat message:', error);
      });
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const port = process.env.PORT;
const startServer = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    server.listen(port, () => {
      console.log(`Server connected at port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
