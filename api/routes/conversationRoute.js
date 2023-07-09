import express from 'express';
import {
  getConversations,
  createConversation,
  getSingleConversation,
} from '../controllers/convetsationController.js';
const router = express.Router();

import { verifyToken } from '../middleware/jwt.js';

router.get('/', verifyToken, getConversations);
router.post('/', verifyToken, createConversation);
router.get('/single/:id', verifyToken, getSingleConversation);

export default router;
