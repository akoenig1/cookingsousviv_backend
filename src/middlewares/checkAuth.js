import 'dotenv/config';
import jwt from 'jsonwebtoken'

module.exports = (req, res, next) => {
  try {
    if(!req.headers.authorization) {
      throw new Error('Authentication failed!');
    }
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    req.userData = {id: decodedToken._id};
    next();
  } catch(err) {
    console.log(err);
  }
};