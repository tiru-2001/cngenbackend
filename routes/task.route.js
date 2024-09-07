import express from 'express';
import {
  getTasks,
  postTasks,
  acceptTask,
  rejectTask,
  completeTask,
} from '../controllers/task.controller.js';
const route = express.Router();
route.post('/add-task', postTasks);
route.get('/get-tasks', getTasks);
route.post('/accept-task', acceptTask);
route.post('/reject-task', rejectTask);
route.post('/complete-task', completeTask);
export default route;
