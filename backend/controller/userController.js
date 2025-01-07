import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && !user.isActivated)
    return res.status(401).json({ message: "Account is deactivated" });
  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.json({
      _id: user._id,
      name: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

const logoutUser = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  const { name, email, password, profilePic } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    user.username = name || user.username;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    user.profilePicture = profilePic;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      profilePicture: updatedUser.profilePicture,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

const updateTokenUserProfile = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    user.username = name || user.username;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

const getUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deactivateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isActivated = !user.isActivated;
    await user.save();

    res.status(200).json({ message: "User update successfully", user });
  } catch (error) {
    console.error("Error on updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  res.send("update user");
};

const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    return res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

const getUserByToken = async (req, res) => {
  const token = req.params.token;
  const user = await User.findOne({ loginToken: token });

  if (user) {
    return res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

const registerUserAndGenerateLink = async (req, res) => {
  const { name, email, isAdmin } = req.body;
  let p1 = btoa(name);
  let p2 = new Date().getTime();
  let p3 = btoa(p2);
  let token = p1 + p2 + p3;
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({
    username: name,
    email: email,
    password: Math.random().toString(36).slice(-8),
    loginToken: token,
    isAdmin: isAdmin,
  });

  if (user) {
    const registrationLink = `${process.env.FRONTEND_URL}/link?t=${token}`;

    // Send Email
    sendMail(user.email, registrationLink);

    res.status(201).json({
      message: "User registered successfully",
      // link: registrationLink,
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

const sendMail = (email, link) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Resource Portal Scope",
    html: `
      <p>Hi,</p>
      <p>This is your joining link:</p>
      <a href="${link}" target="_blank">Click here to join</a>
      <p>Best regards,</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent successfully:");
    }
  });
};

export {
  authUser,
  logoutUser,
  getUserById,
  getUserByToken,
  getUsers,
  updateUser,
  updateUserProfile,
  deleteUser,
  deactivateUser,
  getUserProfile,
  registerUserAndGenerateLink,
  updateTokenUserProfile,
};
