const Post = require("../model/Post");

exports.PostData = async (req, res) => {
  const post = await new Post({
    title: req.body.title,
    description: req.body.description,
  });
  post
    .save(post)
    .then((info) => {
      res.json({
        data: {
          info,
        },
      });
    })
    .catch((err) => console.log(err));
};
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  Post.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

exports.UpdateData = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;
  Post.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe post was not found!`,
        });
      } else {
        res.send({ message: "updated successfully", data });
      }
    })
    .catch((err) => {
      res.status(404).send({
        message: "Error updating Tutorial with id=" + id,
      });
    });
};
exports.GEtData = (req, res) => {
  const id = req.params.id;
  Post.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe post was not found!`,
        });
      } else {
        res.send({ message: "data get  successfully", data });
      }
    })
    .catch((err) => {
      res.status(404).send({
        message: "Error updating Tutorial with id=" + id,
      });
    });
};
exports.delete = (req, res) => {
  const id = req.params.id;
console.log(id)
  Post.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tutorial with id=${id}. Maybe post was not found!`,
        });
      } else {
        res.send({
          message: "post was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id,
      });
    });
};