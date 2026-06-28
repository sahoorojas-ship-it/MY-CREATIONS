var express = require("express");
var dotenv = require("dotenv");
const { getUser, createUser } = require("./controllers/user.controller");
const { userRouter } = require("./routers/user.router");
const {
  ageCheckMiddleware,
  adhaarCardCheckMiddleware,
} = require("./middlewares/user.middleware");
const { logger } = require("./middlewares/logger.middleware");
var cors = require("cors");

dotenv.config();
const { dbConfig } = require("./configurations/db.config");

var app = express();
app.use(cors());
let port = process.env.PORT || 5001;

// application level middleware
app.use(logger);
// in build middleware
app.use(express.json());

// Router level middleware
app.use(
  "/api/v1/user",
  // ageCheckMiddleware,
  // adhaarCardCheckMiddleware,
  userRouter,
);

// app.use("/api/v1/order", orderRouter);

app.listen(port, async () => {
  console.log(`Listening on port ${port}`);
  await dbConfig();
});

//http://localhost:5001/api/v1/users/getUsers
// http://localhost:5001/api/v1/users/createUser
// http://localhost:5001/api/v1/order/getOrders

// dsa - updates !!!

// scratch ; express app , order , user , payment routes

// swiggy (backend)
// getOrders
// login

// endpoint, list down that !!! (5 mins)

// fetch('https://fakestoreapi.com/products', {
// method: "POST", body : payload})
// // .then(res=>res.json())
// // .then(json=>console.log(json))
