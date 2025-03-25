const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user-controller");
const ValidateMiddleware = require("../middlewares/validate-middleware");
const { body } = require("express-validator");

router.post(
  "/register",
  [
    body("userName")
      .trim()
      .notEmpty()
      .withMessage("Username cannot be empty!")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters!"),

    body("password")
      .notEmpty()
      .withMessage("Password cannot be empty!")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  ValidateMiddleware,
  UserController.registerUser
);
router.post(
  "/login",
  [
    body("userName").notEmpty().withMessage("Username cannot be empty!"),
    body("password").notEmpty().withMessage("Password cannot be empty!"),
  ],
  ValidateMiddleware,
  UserController.loginUser
);

module.exports = router;
