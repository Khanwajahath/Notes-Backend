import jwt from 'jsonwebtoken';

const generateToken = (id, name, email) => {
  return jwt.sign({ id, name, email }, process.env.JWT_SECRET || 'supersecret', {
    expiresIn: '30d',
  });
};

export default generateToken;