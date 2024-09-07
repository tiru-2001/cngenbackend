import employee from '../database/employee/employeeschema.js';

import colors from 'colors';
import {
  checkPassword,
  hashPassword,
} from '../middlewares/bcrypt/decodepassword.js';
import jwt from 'jsonwebtoken';

const employeeRegister = async (req, res) => {
  try {
    const { name, email, phone, password, location, description, serviceType } =
      req.body;
    console.log(name, email, phone, password, location, description);
    if (
      !name ||
      !email ||
      !phone ||
      !password ||
      !location ||
      !description ||
      !serviceType
    ) {
      return res
        .status(401)
        .send({ message: 'Please fill the form', success: false });
    }
    const { filename } = req.file;
    console.log(filename);
    const userExist = await employee.findOne({ email: email });
    if (userExist) {
      return res.status(400).send({
        message: 'user already exists',
        success: false,
      });
    }
    const hashedPassword = hashPassword(password);
    console.log(hashedPassword);
    const savedData = await new employee({
      name,
      email,
      password: hashedPassword,
      phone,
      location,
      description,
      image: filename,
    }).save();
    console.log(savedData);
    return res.status(200).send({
      message: 'user registered successfully',
      success: true,
      savedData,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: 'Internal server error',
      success: false,
    });
  }
};
const employeeLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await employee.findOne({ email: email });
    if (!userExist) {
      return res.status(400).send({
        message: 'There is no user with that email address',
        success: false,
      });
    }
    const comparePassword = await checkPassword(password, userExist.password);
    if (!comparePassword) {
      return res.status(400).send({
        message: 'invalid credentials',
        success: false,
      });
    }
    const employeedetails = {
      name: userExist.name,
      email: userExist.email,
      isAdmin: userExist.isAdmin,
    };

    const token = jwt.sign(employeedetails, process.env.JWT_SECRETKEY);

    return res.status(200).send({
      success: true,
      message: 'user logged in successfully',
      token: token,
      userExist,
    });
  } catch (e) {
    console.log(colors.red.underline(e));
    return res.status(500).send({
      message: 'Something went wrong',
      succcess: false,
    });
  }
};
export { employeeLogin, employeeRegister };
