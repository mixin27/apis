const { StatusCodes } = require('http-status-codes');

const CustomError = require('../errors');
const {
  checkPermissions,
  createTokenUser,
  attachCookiesToResponse,
} = require('../utils');
const User = require('../models/User');

const getAllUsers = async (req, res) => {
  console.log(req.user);
  const users = await User.find({ role: 'user' }).select('-password');
  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select('-password');
  if (!user)
    throw new CustomError.NotFoundError(
      `No user found with id : ${req.params.id}`
    );

  checkPermissions(req.user, user._id);

  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

// update User with user.save()
const updateUser = async (req, res) => {
  const { email, name } = req.body;

  if (!email || !name)
    throw new CustomError.BadRequestError('Please provide all field values.');

  const user = await User.findOne({ _id: req.user.userId });
  user.email = email;
  user.name = name;

  await user.save();

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword)
    throw new CustomError.BadRequestError(
      'Please provide old and new password.'
    );

  const user = await User.findOne({ _id: req.user.userId });
  const isOldPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isOldPasswordCorrect)
    throw new CustomError.UnauthenticatedError('Invalid credentials.');

  user.password = newPassword;
  await user.save();

  res.status(StatusCodes.OK).json({ msg: 'Successfully updated password.' });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};

// update User with findOneAndUpdate()
// const updateUser = async (req, res) => {
//   const { email, name } = req.body;

//   if (!email || !name)
//     throw new CustomError.BadRequestError('Please provide all field values.');

//   const user = await User.findOneAndUpdate(
//     { _id: req.user.userId },
//     { email, name },
//     { new: true, runValidators: true }
//   );

//   const tokenUser = createTokenUser(user);

//   attachCookiesToResponse({ res, user: tokenUser });

//   res.status(StatusCodes.OK).json({ user: tokenUser });
// };
