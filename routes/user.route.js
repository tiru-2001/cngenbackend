import express from 'express';
import { userLogin, userRegister } from '../controllers/user.controller.js';
import upload from '../middlewares/multer/multer.js';
const router = express.Router();
router.post('/login', userLogin);
router.post('/register', userRegister);
export default router;
