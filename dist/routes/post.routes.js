"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// IMPORT ROUTER
const express_1 = require("express");
const router = express_1.Router();
// IMPORT CONTROLLERS
const post_controller_1 = require("../controllers/post.controller");
// DEFINE ENDPOINTS
router
    .route("/")
    .get(post_controller_1.getPosts)
    .post(post_controller_1.createPosts);
router
    .route("/:postId")
    .get(post_controller_1.getOnePost)
    .delete(post_controller_1.deletePost)
    .put(post_controller_1.updatePost);
// EXPORT ROUTES
exports.default = router;
