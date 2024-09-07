import crypto from 'crypto';
import Razorpay from 'razorpay';
import paymentmodel from '../database/payment/payment.js';
import taskmodel from '../database/task/taskschema.js';

const createOrders = async (req, res) => {
  const razorpayInstance = new Razorpay({
    key_id: 'rzp_live_KNylegCqksQhjg',
    key_secret: 'cjKRYerFaX7kFpcNagz6s8wt',
  });
  try {
    const {
      address,
      isTimeOpen,
      bookingPrice,
      selectedAddressType,
      startDate,
      startTime,
    } = req.body;
    const options = {
      amount: bookingPrice * 100,
      currency: 'INR',
      receipt: crypto.randomBytes(10).toString('hex'),
    };

    razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something Went Wrong!' });
      }
      res.status(200).json({ data: order });
      console.log(order);
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error!' });
    console.log(error);
  }
};

const verifyOrders = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    email,
    phone,
    startDate,
    startTime,
    address,
    selectedAddressType,
    vehicleType,
    isTimeOpen,
    bookingPrice,
  } = req.body;
  console.log(
    startDate,
    startTime,
    address,
    selectedAddressType,
    vehicleType,
    isTimeOpen
  );
  // Validate that all necessary fields are present
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ message: 'Missing required fields!' });
  }
  try {
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', '1jghCMAlKJIGH4e6xEtPwUrW') // Ensure the key_secret is correct and provided
      .update(sign.toString())
      .digest('hex');
    const isAuthentic = expectedSign === razorpay_signature;

    if (isAuthentic) {
      const task = await new taskmodel({
        location: address,
        amount: bookingPrice,
        vehicleType,
        assignDate: startDate,
        assignTime: startTime,
        addressType: selectedAddressType,
      }).save();

      const payments = new paymentmodel({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        userEmail: email,
        userPhone: phone,
        taskId: task._id,
      });
      await payments.save();
      res.json({
        message: 'Payment Successful',
        success: true,
      });
    } else {
      res.status(400).json({ message: 'Invalid signature' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error!' });
    console.log(error);
  }
};

export { verifyOrders, createOrders };
