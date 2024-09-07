import bcrypt from 'bcrypt';

const hashPassword = (pass) => {
  try {
    const hashedPassword = bcrypt.hashSync(pass, 10);
    return hashedPassword;
  } catch (e) {
    console.log(e);
  }
};

const checkPassword = async (pass, dbpass) => {
  try {
    const validatePassword = await bcrypt.compare(pass, dbpass);
    return validatePassword;
  } catch (e) {
    console.log(e);
  }
};

export { checkPassword, hashPassword };
