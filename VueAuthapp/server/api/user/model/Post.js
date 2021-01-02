const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please Include your title"],
  },
  description: {
    type: String,
    required: [true, "Please Include your description"],
  },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;