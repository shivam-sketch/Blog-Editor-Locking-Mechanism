import express from "express";
const router = express.Router();
import * as controller from "../../../controllers/api/v1/blogController.js";
import { validate } from "../../../middlewares/validate.js";
import auth from "../../../middlewares/verifyToken.js";
import { updateBlogValidation } from "../../../validations/joi.js";

router
  .route("/")
  .post(auth(["User"]), controller.addBlog)
  .get(auth(["User"]), controller.getBlog)
  .put(auth(["User"]), validate(updateBlogValidation), controller.updateBlog);

router.get("/:id", controller.getBlogById);

export default router;
