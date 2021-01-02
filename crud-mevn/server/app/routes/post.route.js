module.exports = (app) => {
  const tutorials = require("../controllers/post.controller");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", tutorials.create);


  app.use("/api/post", router);
};
