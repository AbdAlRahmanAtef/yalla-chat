import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import User from "../models/User.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const signup = async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;
    const isUserFound = await User.findOne({ email });
    console.log(isUserFound);
    if (isUserFound) return res.json({ message: "User already exists" });

    const result =
      avatar !== ""
        ? await cloudinary.uploader.upload(avatar, {
            width: 200,
            height: 200,
            crop: "fill",
          })
        : "";
    const imageUrl = avatar !== "" ? result.secure_url : "";

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      avatar: imageUrl,
    });
    const token = jwt.sign({ userId: user._id, name }, process.env.JWT_SECRET);

    res
      .cookie("token", token, { sameSite: "none", secure: true })
      .json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isFound = await User.findOne({ email });
    if (!isFound) return res.status(404).json({ message: "User not found" });

    const isPasswordMatch = await bcrypt.compare(password, isFound.password);
    if (!isPasswordMatch)
      return res.status(404).json({ message: "wrong email or password" });

    const token = jwt.sign(
      { userId: isFound._id, name: isFound.name },
      process.env.JWT_SECRET
    );

    res.json({
      token,
      user: {
        _id: isFound._id,
        name: isFound.name,
        email: isFound.email,
        avatar: isFound.avatar,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
