import user from '../database/user/userschema.js';
import taskmodel from '../database/task/taskschema.js';
import employee from '../database/employee/employeeschema.js';
import { io } from '../server.js';

/* check admin controller*/
const checkAdmin = async (req, res) => {
  try {
    const isAdmin = req.isAdmin;
    const email = req.email;
    console.log(isAdmin);
    if (!isAdmin) {
      return res.status(401).send({
        message: 'You are not allowed to access this page',
        success: false,
      });
    }

    const adminDetails = await employee.findOne({ email: req.email });

    return res.status(200).send({
      message: 'You are  allowed to access this page',
      success: true,
      adminDetails,
    });
  } catch (e) {
    console.log(e);
  }
};
/*get employees controller */
const getEmployees = async (req, res) => {
  try {
    const employees = await employee.find();
    return res.status(200).send({
      success: true,
      message: 'Data has been fetched successfully',
      employees,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: 'Something went wrong in getEmployeees controller',
      success: false,
    });
  }
};

/*assign tasks by admin*/
const assignTask = async (req, res) => {
  try {
    const { employee_id } = req.params;
    const { taskId } = req.body;
    console.log('employee_id' + employee_id, 'taskId' + taskId);
    const task = await taskmodel.findByIdAndUpdate(
      taskId,
      { $set: { employee_id: employee_id, status: 'Pending' } },
      { new: true }
    );
    console.log('task', task);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    io.to(employee_id).emit('taskAssigned', task);
    return res.status(200).send({ message: 'Task assigned successfully' });
  } catch (e) {
    console.log(e);
  }
};

const getAssignedTask = async (req, res) => {
  try {
    const task = await taskmodel.find({});
    return res.status(201).send({
      success: true,
      message: 'data has been fetched successfully',
      task,
    });
  } catch (e) {
    console.log(e);
  }
};
export { checkAdmin, getEmployees, assignTask, getAssignedTask };
