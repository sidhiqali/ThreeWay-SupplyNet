import Order from '../mongoDB/models/orderSchema.js';
import dotenv from 'dotenv';
dotenv.config();

//@desc create new order
//@route POST /api/order/
//@access private

export const createOrder = async (req, res, next) => {
  try {
    const order = await Order.create({
      orderId: req.userId + req.body.transporterId,
      from: req.body.from,
      to: req.body.to,
      quantity: req.body.quantity,
      manufactureId: req.userId,
      transporterId: req.body.transporterId,
      pickUpAddress: req.address,
    });
    res.status(201).send(order);
  } catch (error) {
    next(error);
  }
};

//@desc get all orders with optional search
//@route GET /api/order/
//@access private
export const getOrders = async (req, res, next) => {
  try {
    const { search } = req.query;
    const query = {
      ...(req.isTransporter
        ? { transporterId: req.userId }
        : { manufactureId: req.userId }),
    };
    if (search) {
      query.$or = [
        { from: { $regex: new RegExp(search, 'i') } },
        { to: { $regex: new RegExp(search, 'i') } }
      ];
    }
    const orders = await Order.find(query);
    res.status(200).send(orders);
  } catch (error) {
    next(error);
  }
};

