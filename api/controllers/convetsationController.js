import { createError } from '../utils/createError.js';
import Conversation from '../mongoDB/models/conversationSchema.js';

//@desc create a new Conversation
//@route POST /api/conversations/
//@access private

export const createConversation = async (req, res, next) => {
  const newConversation = new Conversation({
    id: req.isTransporter
      ? req.userId + req.body.receiver
      : req.body.receiver + req.userId,
    transporterId: req.isTransporter ? req.userId : req.body.receiver,
    manufactureId: req.isTransporter ? req.body.receiver : req.userId,
  });
  try {
    const savedConversation = await newConversation.save();
    res.status(201).send(savedConversation);
  } catch (err) {
    next(err);
  }
};

//@desc fetch single conversation
//@route GET /api/conversations/single/:id
//@access private

export const getSingleConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({ id: req.params.id });
    if (!conversation) return next(createError(404, 'Not found!'));
    res.status(200).send(conversation);
  } catch (err) {
    next(err);
  }
};

//@desc get conversations
//@route GET /api/conversations/
//@access private

export const getConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find(
      req.isTransporter ? { transporterId: req.userId } : { manufactureId: req.userId }
    ).sort({ updatedAt: -1 });
    res.status(200).send(conversations);
  } catch (err) {
    next(err);
  }
};
