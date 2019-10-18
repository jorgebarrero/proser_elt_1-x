// IMPORT TO CONNECT TO DATABASE
import { Request, Response } from "express";
import { connect } from "../connectors/mariadb";

// IMPORT INTERFACE
import { PostInterface } from "./../interface/Post.interface";

/*************************************************************************** */
// GET ALL POSTS
export async function getPosts(req: Request, res: Response): Promise<Response> {
  // CREATE SQL QUERY
  let querySQL = `
  SELECT * FROM post
  `;

  // QUERY THE DATABASE
  const conn = await connect.getConnection();
  const posts = await conn.query(querySQL);

  // RETURN RESPONSE
  return res.json(posts[0]);
}

/*************************************************************************** */
// FIND ONE POST
export async function getOnePost(
  req: Request,
  res: Response
): Promise<Response> {
  // CREATE SQL QUERY
  let querySQL = `
  SELECT * FROM post WHERE id = ?
  `;

  // QUERY THE DATABASE
  const id = req.params.postId;
  const conn = await connect.getConnection();
  const post = await conn.query(querySQL, [id]);

  // RETURN RESPONSE
  return res.json(post[0]);
}

/*************************************************************************** */
// CREATE POSTS
export async function createPosts(
  req: Request,
  res: Response
): Promise<Response> {
  // CREATE SQL QUERY
  let querySQL = `
  INSERT INTO post  SET ?
  `;

  // QUERY THE DATABASE
  const newPost: PostInterface = req.body;
  const conn = await connect.getConnection();
  await conn.query(querySQL, [newPost]);

  // RETURN RESPONSE
  return res.json({ message: "Post created" });
}

/*************************************************************************** */
// DELETE POSTS
export async function deletePost(
  req: Request,
  res: Response
): Promise<Response> {
  // CREATE SQL QUERY
  let querySQL = `
  DELETE FROM post WHERE id = ?
  `;

  // QUERY THE DATABASE
  const id = req.params.postId;
  const conn = await connect.getConnection();
  await conn.query(querySQL, [id]);

  // RETURN RESPONSE
  return res.json({ message: "Post deleted" });
}

/*************************************************************************** */
// DELETE POSTS
export async function updatePost(
  req: Request,
  res: Response
): Promise<Response> {
  // CREATE SQL QUERY
  let querySQL = `
  UPDATE post SET ? WHERE id = ?
  `;

  // QUERY THE DATABASE
  const updatePost: PostInterface = req.body;
  const id = req.params.postId;
  const conn = await connect.getConnection();
  await conn.query(querySQL, [updatePost, id]);

  // RETURN RESPONSE
  return res.json({ message: "Post updated" });
}
