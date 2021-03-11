import 'dotenv/config';
import jwt from 'jsonwebtoken'

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if(!token) {
      throw new Error('Authentication failed!');
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    req.userData = {id: decodedToken.id};
    next();
  } catch(err) {
    console.log(err);
  }
};