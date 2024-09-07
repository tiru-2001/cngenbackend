import express from 'express';
import {
  checkAdmin,
  getEmployees,
  assignTask,
  getAssignedTask,
} from '../controllers/admin.controller.js';

import verifyToken from '../middlewares/jwt/verifytoken.js';
const route = express.Router();
route.get('/checkadmin', verifyToken, checkAdmin);
route.get('/get-employees', getEmployees);
// route.get('/get-tasks', getTasks);
route.post('/assign-task/:employee_id', verifyToken, assignTask);
route.post('/get-assignedtas', verifyToken, getAssignedTask);

export default route;
