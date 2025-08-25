const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const blackListTokenModel = require("../models/blacklistToken.model");

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;

  const isUserAlreadyExist = await userModel.findOne({ email });

  if (isUserAlreadyExist) {
    return res.status(400).json({ error: "User already exists" });
  }

  const hashedPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken();

  res.status(201).json({ token, user });
};

module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = user.generateAuthToken();

  res.cookie("token", token);

  res.status(200).json({ token, user });
};

module.exports.getUserProfile = async (req, res, next) => {
  res.status(200).json(req.user);
};

module.exports.logoutUser = async (req, res, next) => {
  res.clearCookie("token");

  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  await blackListTokenModel.create({ token });

  res.status(200).json({ message: "Logged out successfully" });
};

module.exports.updateUserProfile = async (req, res, next) => {
  try {
    const { fullname, email, phoneNumber, password } = req.body;

    const user = await userModel.findById(req.user._id).select("+password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields if they are provided
    if (fullname) {
      user.fullname.firstname = fullname.firstname || user.fullname.firstname;
      user.fullname.lastname = fullname.lastname || user.fullname.lastname;
    }
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber; // Map frontend 'phone' to backend 'phoneNumber'
    if (password) {
      user.password = await userModel.hashPassword(password);
    }

    const updatedUser = await user.save();

    const userObject = updatedUser.toObject();
    delete userObject.password;

    res.status(200).json(userObject);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Email or phone number already in use." });
    }
    console.error("Profile update error:", error);
    res.status(500).json({ message: "Server error while updating profile." });
  }
};
