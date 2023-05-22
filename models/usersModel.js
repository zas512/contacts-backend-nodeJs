const mongoose = require("mongoose");

const usersSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add the username."],
    },
    email: {
      type: String,
      required: [true, "Please add the user email name."],
      unique: [true, "Email already taken."],
    },
    password: {
      type: String,
      required: [true, "Please add the password."],
    },
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("User", usersSchema);
