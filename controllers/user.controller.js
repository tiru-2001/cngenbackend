import usermodel from '../database/user/userschema.js';
import {
  hashPassword,
  checkPassword,
} from '../middlewares/bcrypt/decodepassword.js';
import jwt from 'jsonwebtoken';
const userRegister = async (req, res) => {
  try {
    // const { filename } = req.file;
    const { username, phone, email, password } = req.body;
    if (!username || !phone || !email || !password) {
      return res.status(401).send({
        message: 'Please fill the form completely',
        success: false,
      });
    }
    const userExist = await usermodel.findOne({ email });
    if (userExist) {
      return res.status(401).send({
        message: 'user already exists',
        success: false,
      });
    }

    const hashedPassword = hashPassword(password);
    const savedUserData = await new usermodel({
      username,
      phone,
      email,
      password: hashedPassword,
      // img: filename,
    }).save();
    return res.status(201).send({
      message: 'User has been saved successfully',
      success: true,
      savedUserData,
    });
  } catch (e) {
    console.log(e);
  }
};

const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send({
        message: 'Please fill the form completely',
        success: false,
      });
    }

    const userExist = await usermodel.findOne({ username });
    if (!userExist) {
      return res.status(401).send({
        message: 'There is no use with that username',
        success: false,
      });
    }
    const comparePassword = await checkPassword(password, userExist.password);
    if (!comparePassword) {
      return res.status(401).send({
        message: 'Please enter a valid password',
        success: false,
      });
    }

    const user = {
      name: userExist.username,
      email: userExist.email,
    };
    const token = jwt.sign(user, process.env.JWT_SECRETKEY);
    return res.status(200).send({
      success: true,
      message: 'user logged in successfully',
      token: token,
      userExist,
    });
  } catch (e) {
    console.log(e);
  }
};

const userBooking = async (req, res) => {
  try {
    const { carname, user, time, date } = req.body;
    if (!carname || !time || !date || !user || !amount) {
      return res.status(400).send({
        message: 'fill the form completely',
        success: false
      });
    }
    
  } catch (e) {
    console.log(e);
  }
};
export { userRegister, userLogin };
