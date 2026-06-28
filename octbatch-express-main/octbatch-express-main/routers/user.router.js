var express = require("express");
const { getUser, createUser } = require("../controllers/user.controller");
const {
  ageCheckMiddleware,
  adhaarCardCheckMiddleware,
} = require("../middlewares/user.middleware");

var userRouter = express.Router();

userRouter.get("/getUser", getUser);
userRouter.post("/createUser", createUser);

module.exports = { userRouter };
