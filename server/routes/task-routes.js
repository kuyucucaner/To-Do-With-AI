const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/task-controller");
const ValidateMiddleware = require("../middlewares/validate-middleware");
const AuthMiddleware = require("../middlewares/auth-middleware");
const { body } = require("express-validator");
//Get all tasks
router.get("/get-tasks", AuthMiddleware, TaskController.getAllTaskByUserId);

//Create a new task
router.post(
  "/create-task",
  AuthMiddleware,
  [
    body("title")
      .notEmpty()
      .withMessage("Task title must be provided!")
      .isLength({ max: 100 }),
    body("description")
      .notEmpty()
      .withMessage("Task description must be provided!")
      .isLength({ max: 255 }),
    body("dueDate")
      .optional()
      .isISO8601()
      .withMessage("Due date must be a valid ISO 8601 date")
      .isBefore(new Date(), "Due date must be in the past")
      .withMessage("Due date must be in the past"),
    body("tags").isArray({ min: 1 }).withMessage("Task tags cannot be empty!"),
  ],
  ValidateMiddleware,
  TaskController.createTask
);

//Update a task
router.put(
  "/update-task/:id",
  [
    body("title")
      .optional()
      .notEmpty()
      .withMessage("Task title must be provided!")
      .isLength({ max: 100 }),
    body("description")
      .optional()
      .notEmpty()
      .withMessage("Task description must be provided!")
      .isLength({ max: 255 }),
    body("dueDate")
      .optional()
      .isISO8601()
      .withMessage("Due date must be a valid ISO 8601 date")
      .isBefore(new Date(), "Due date must be in the past")
      .withMessage("Due date must be in the past"),
    body("tags")
      .optional()
      .notEmpty()
      .withMessage("Task tags cannot be empty!"),
      body("completed")
      .optional()
      .isBoolean()
      .withMessage("Completed must be a boolean value"),
  ],
  AuthMiddleware,
  ValidateMiddleware,
  TaskController.updateTask
);

//Delete a task

router.delete("/delete-task/:id", AuthMiddleware, TaskController.deleteTask);

module.exports = router;
