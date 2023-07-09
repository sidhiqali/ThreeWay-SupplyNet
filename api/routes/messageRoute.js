import express from 'express';
import {
  createMessage,
  getMessages,
} from '../controllers/messageController.js';
const router = express.Router();

import { verifyToken } from '../middleware/jwt.js';

router.post('/', verifyToken, createMessage);
router.get('/:id', verifyToken, getMessages);

export default router;
