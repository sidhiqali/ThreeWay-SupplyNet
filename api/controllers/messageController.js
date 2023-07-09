import { createError } from '../utils/createError.js';
import Message from '../mongoDB/models/messageSchema.js';
import Conversation from '../mongoDB/models/conversationSchema.js';

//@desc create new message
//@route POST /api/messages/
//@access private
export const createMessage = async (req, res, next) => {
  const { conversationId, desc } = req.body;
  try {
    const conversation = await Conversation.findOne({ id: conversationId });
    if (!conversation) {
      throw createError(404, 'Conversation not found');
    }
    const newMessage = new Message({
      conversationId,
      userId: req.userId,
      desc,
    });
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    next(error);
  }
};

//@desc get messages
//@route GET /api/messages/:id
//@access private
export const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({ conversationId: req.params.id });
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};
