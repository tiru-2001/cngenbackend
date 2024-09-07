import express from 'express';
import { getProfile } from '../controllers/profile.controller.js';
const routes = express.Router();
routes.get('/profile/:id', getProfile);
export default routes;
