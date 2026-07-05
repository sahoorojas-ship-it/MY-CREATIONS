const { User } = require("../models/user.model");

function getUser(request, response) {
  User.find({})
    .then((res) => {
      response.json({ message: "Users!!!!!", data: res });
    })
    .catch((error) => {
      console.log(error);
    });
}
function createUser(request, response) {
  User.create(request.body)
    .then((res) => {
      response.json({ message: "User is registered!!!" });
    })
    .catch((error) => {
      response.json({ message: "Something went wrong!!!", error: error });
    });
}
module.exports = { getUser, createUser };