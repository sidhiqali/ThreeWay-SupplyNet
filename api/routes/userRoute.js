import express from 'express';
const router = express.Router();
import {
  register,
  login,
  logout,
  getUser,
  getTransporters,
} from '../controllers/userController.js';
import { verifyToken } from '../middleware/jwt.js';


router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/transporters', verifyToken, getTransporters);
router.get('/:id', getUser);

export default router;
