const express = require("express");
const router = express.Router();
const auth = require("../../../config/auth");
const postController = require("../controller/post.controller");

router.post("/p", auth, postController.PostData);
router.get("/me", auth, postController.findAll);
router.put("/:id", auth, postController.UpdateData);
router.get("/:id", auth, postController.GEtData);
router.delete("/:id", auth, postController.delete);
module.exports = router;
