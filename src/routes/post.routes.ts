// IMPORT ROUTER
import { Router } from "express";
const router = Router();

// IMPORT CONTROLLERS
import {
  getPosts,
  createPosts,
  getOnePost,
  deletePost,
  updatePost
} from "../controllers/post.controller";

// DEFINE ENDPOINTS
router
  .route("/")
  .get(getPosts)
  .post(createPosts);

router
  .route("/:postId")
  .get(getOnePost)
  .delete(deletePost)
  .put(updatePost);

// EXPORT ROUTES
export default router;
