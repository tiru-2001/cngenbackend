import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import colors from 'colors';
import connectToDb from './config/connect.js';
import employeeRoute from './routes/employee.route.js';
import profileroute from './routes/profile.route.js';
import adminroute from './routes/admin.route.js';
import taskroute from './routes/task.route.js';
import userRoute from './routes/user.route.js';
import paymentRoute from './routes/payment.route.js';
// socket import
import { Server } from 'socket.io';
import http from 'http';
const app = express();
const server = http.createServer(app);

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://cngen.netlify.app',
  'https://cngenfrontend.vercel.app',
 'https://www.cngengroup.com'
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
  },
});
io.on('connection', (socket) => {
  socket.on('joinRoom', (employee_id) => {
    socket.join(employee_id);
    console.log(`Employee ${employee_id} joined their room`);
  });
});

dotenv.config();
connectToDb();
const port = process.env.PORT || 7000;
app.use(express.json());
app.get('/', (req, res) => {
  res.send('hi');
});
//profile route
app.get('/get-profile', profileroute);
//employee route
app.use('/api/v1/employee', employeeRoute);
//user route
app.use('/api/v1/user', userRoute);
//admin route
app.use('/api/v1/admin', adminroute);
//task route
app.use('/api/v1/tasks', taskroute);
//get image
app.use('/uploads', express.static('./uploads'));
//payment route
app.use('/api/v1/payment', paymentRoute);

server.listen(port, () => {
  console.log(colors.magenta.italic('listening on port'));
});

export { io };
