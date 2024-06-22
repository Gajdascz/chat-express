import bcrypt from 'bcrypt';
import asyncHandler from 'express-async-handler';

export default asyncHandler(async (req, res, next) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ msg: 'No password found in request' });
  const hashedPassword = await bcrypt.hash(password, 10);
  req.body.password = hashedPassword;
  next();
});
