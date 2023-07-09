import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    manufactureId: {
      type: String,
      required: true,
    },
    transporterId: {
      type: String,
      required: true,
    },
    pickUpAddress: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Order', orderSchema);
