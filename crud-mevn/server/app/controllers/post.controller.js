const db = require("../models");
const Post = db.posts;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Tutorial
  const tutorial = new Post({
    name: req.body.name,
    email: req.body.email
  });

  // Save Tutorial in the database
  tutorial
    .save(tutorial)
    .then((data) => {
        console.log(data)
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};
