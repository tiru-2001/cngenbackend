import express from 'express';
import {
  verifyOrders,
  createOrders,
} from '../controllers/payment.controller.js';
const route = express.Router();

route.post('/createOrders', createOrders);
route.post('/verifyOrders', verifyOrders);
export default route;
