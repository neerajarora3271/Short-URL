const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
// to check in db do following
//mongosh  
//show dbs 
// use short-url
// show collections
// there are two collections one is users and other is urls
// if u want to see data in urls 
// run 
// db.urls.find({})
// if u want to see data in users 
// run 
// db.users.find({})