const UserModel = require("../models/user-model");
const jwt = require("jsonwebtoken");
require('dotenv').config(); 

const UserController = {
  registerUser: async function (req, res) {
    const { userName, password } = req.body;
    if(!userName || !password){
      return res.status(400).json({ message: "Please provide an username and password"})
    }
    try {
      console.log(req.body);
      let user = await UserModel.findOne({ userName });
      if (user) {
        return res
          .status(400)
          .json({ success: false, message: "User already registered" });
      }
     
      const newUser = await UserModel.create({
        userName,
        password,
      });
      console.log("New User : ", newUser);
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.cookie("accessToken", token, { httpOnly: true }).status(201).json({
        userName: newUser.userName,
        message: "User registeration successful!",
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  loginUser: async function (req, res) {
    const { userName, password } = req.body;
    if(!userName || !password) {
      return res.status(400).json({ message: "Please provide both userName and password!" });  
    }
    try {
      let user = await UserModel.findOne({ userName }).select("+password");
      if (!user) {
        return res.status(400).json({ message: "Username or Password is incorrect!" });
      }
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: "Username or Password is incorrect!" });
      }      
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.cookie("accessToken", token, { httpOnly: true }).status(200).json({
        userName: user.userName,
        message: "User login successful!",
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = UserController;
