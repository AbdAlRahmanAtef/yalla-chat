import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await User.find({ _id: { $ne: id } }).select(
      "_id name status email avatar"
    );

    if (!users) return res.status(404).json({ message: "No users found" });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
