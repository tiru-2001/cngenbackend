import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

const paymentSchema = new Schema({
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
  taskId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  userEmail: {
    type: String,
    required: true,
  },
  userPhone: {
    type: Number,
    required: true,
  },
});

const paymentmodel = mongoose.model('payment', paymentSchema);
export default paymentmodel;
