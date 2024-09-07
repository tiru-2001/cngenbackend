import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers['authorization'];
    console.log(token);
    if (!token || !token.startsWith('Bearer ')) {
      return res.status(401).send({
        message: 'There is no access token please logout and login',
        success: false,
      });
    }
    const actualToken = token.split(' ')[1];
    jwt.verify(actualToken, process.env.JWT_SECRETKEY, async (err, data) => {
      if (err) {
        return res.status(400).send({
          message: 'Authentication failed',
          success: false,
        });
      }

      req.name = data?.name || data?.username;
      req.email = data.email;
      req.isAdmin = data.isAdmin || null;
      next();
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: 'Something went wrong in jwt authentication function',
      success: false,
    });
  }
};

export default verifyToken;
