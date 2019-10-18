"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
/*************************************************************************** */
// GET ALL POSTS
function getPosts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // CREATE SQL QUERY
        let querySQL = `
  SELECT * FROM post
  `;
        // QUERY THE DATABASE
        const conn = yield database_1.connect();
        const posts = yield conn.query(querySQL);
        // RETURN RESPONSE
        return res.json(posts[0]);
    });
}
exports.getPosts = getPosts;
/*************************************************************************** */
// FIND ONE POST
function getOnePost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // CREATE SQL QUERY
        let querySQL = `
  SELECT * FROM post WHERE id = ?
  `;
        // QUERY THE DATABASE
        const id = req.params.postId;
        const conn = yield database_1.connect();
        const post = yield conn.query(querySQL, [id]);
        // RETURN RESPONSE
        return res.json(post[0]);
    });
}
exports.getOnePost = getOnePost;
/*************************************************************************** */
// CREATE POSTS
function createPosts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // CREATE SQL QUERY
        let querySQL = `
  INSERT INTO post  SET ?
  `;
        // QUERY THE DATABASE
        const newPost = req.body;
        const conn = yield database_1.connect();
        yield conn.query(querySQL, [newPost]);
        // RETURN RESPONSE
        return res.json({ message: "Post created" });
    });
}
exports.createPosts = createPosts;
/*************************************************************************** */
// DELETE POSTS
function deletePost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // CREATE SQL QUERY
        let querySQL = `
  DELETE FROM post WHERE id = ?
  `;
        // QUERY THE DATABASE
        const id = req.params.postId;
        const conn = yield database_1.connect();
        yield conn.query(querySQL, [id]);
        // RETURN RESPONSE
        return res.json({ message: "Post deleted" });
    });
}
exports.deletePost = deletePost;
/*************************************************************************** */
// DELETE POSTS
function updatePost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // CREATE SQL QUERY
        let querySQL = `
  UPDATE post SET ? WHERE id = ?
  `;
        // QUERY THE DATABASE
        const updatePost = req.body;
        const id = req.params.postId;
        const conn = yield database_1.connect();
        yield conn.query(querySQL, [updatePost, id]);
        // RETURN RESPONSE
        return res.json({ message: "Post updated" });
    });
}
exports.updatePost = updatePost;
