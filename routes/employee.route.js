import express from 'express';
import {
  employeeLogin,
  employeeRegister,
} from '../controllers/employee.controller.js';
import upload from '../middlewares/multer/multer.js';
const route = express.Router();
route.post('/login', employeeLogin);
route.post('/register', upload.single('image'), employeeRegister);

export default route;
