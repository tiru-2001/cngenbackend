/* post tasks controller*/
import { io } from '../server.js';
import taskmodel from '../database/task/taskschema.js';
const postTasks = async (req, res) => {
  try {
    const { name, location, employee_id, amount, assignTime } = req.params;
    if (!name || !location || !employee_id || !amount ) {
      return res.status(404).send({
        message: 'Please fill the form completely',
        success: false,
      });
    }

    const savetheTask = await new taskmodel({
      name,
      amount,
      location,
      employee_id,
      carwash,
    }).save();
  } catch (e) {
    console.log(e);
  }
};

/*get tasks controller*/
const getTasks = async (req, res) => {
  try {
    const tasks = await taskmodel.find();
    return res.status(200).send({
      message: 'tasks fetched successfully',
      success: true,
      tasks,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).send({
      message: 'Something went wrong in fetching tasks',
      success: false,
    });
  }
};

//accept tasks
const acceptTask = async (req, res) => {
  try {
    console.log(req.query);
    const { employee_id, taskId } = req.query;
    console.log(employee_id, taskId);
    const task = await taskmodel.findOneAndUpdate(
      { taskId },
      { assignedEmployeeId: employee_id, status: 'Accepted' },
      { new: true }
    );
    io.emit('accepted');

    return res.status(200).send({
      message: 'Task successfully accepted',
      success: true,
      task,
    });
  } catch (e) {
    console.log(e);
  }
};
//reject task
const rejectTask = async (req, res) => {
  try {
    const { employee_id, taskId } = req.query;
    const task = await taskmodel.findOneAndUpdate(
      { taskId },
      { assignedEmployeeId: employee_id, status: 'Rejected' },
      { new: true }
    );
    io.emit('rejected');

    return res.status(200).send({
      message: 'Task rejected successfully',
      success: true,
    });
  } catch (e) {
    console.log(e);
  }
};
//complete task
const completeTask = async (req, res) => {
  try {
    const { employee_id, taskId } = req.query;
    const task = await taskmodel.findOneAndUpdate(
      { taskId },
      { assignedEmployeeId: employee_id, status: 'Rejected' },
      { new: true }
    );
    return res.status(200).send({
      message: 'Task rejected successfully',
      success: true,
    });
  } catch (e) {
    console.log(e);
  }
};
export { getTasks, postTasks, acceptTask, rejectTask, completeTask };
