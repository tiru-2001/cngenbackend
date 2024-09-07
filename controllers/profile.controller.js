import employee from '../database/employee/employeeschema.js';
import user from '../database/user/userschema.js';

const getProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const userProfile = await user.findById(id);
    if (!userProfile) {
      return res.status(404).send({
        message: 'Profile not found',
        success: false,
      });
    }
    console.log(userProfile);
    return res.status(200).send({
      message: 'Profile has been found',
      success: true,
      userProfile,
    });
  } catch (e) {
    console.log(e);
  }
};

export { getProfile };
