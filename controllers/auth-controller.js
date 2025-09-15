import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, username, email, password, role } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email or username already exists",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      role,
    });

    const { password: _, ...userData } = newUser._doc;

    return res.status(201).json({
      success: true,
      message: "user registered successfully",
      data: userData,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Internal server error, please try again!",
      error: e.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user)
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const { password: _, ...userData } = user._doc;

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: userData,
      token,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Internal server error, please try again!",
      error: e.message,
    });
  }
};

