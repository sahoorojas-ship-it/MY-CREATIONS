const { default: mongoose } = require("mongoose");

let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name Field is required"],
  },
  age: {
    type: Number,
    required: [true, "Age field is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
  },
  phoneNumber: {
    type: Number,
    unique: true,
    required: [true, "Phone Number is required"],
  },
});

userSchema.pre("save", function () {
  console.log("Data is getting saved!!!!");
});

let User = mongoose.model("user", userSchema);

module.exports = { User };
