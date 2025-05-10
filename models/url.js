const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    visitHistory: [{ timestamp: { type: Number } }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

const URL = mongoose.model("url", urlSchema);

module.exports = URL;

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
