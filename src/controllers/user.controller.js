import User from "../models/User";

export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.userId);
  res.status(200).json(user);
};

export const createUser = (req, res) => {
  res.json("Creating user");
};

export const updateUserById = async(req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true
  })
  res.status(200).json(updatedUser)
};

export const deleteUserById = async(req, res) => {
  const {userId} = req.params
  await User.findByIdAndDelete(userId)
  res.status(200).json("Product Deleted")
};
