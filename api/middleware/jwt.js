import jwt from 'jsonwebtoken';
import { createError } from '../utils/createError.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return next(createError(401, 'your not authenticated'));

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return next(createError(403, 'token not valid'));
    req.userId = payload.id;
    req.isTransporter = payload.isTransporter;
    req.address = payload.address;
    req.username = payload.username;
    next();
  });
};
