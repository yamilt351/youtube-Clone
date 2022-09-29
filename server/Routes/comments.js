import express from "express";
import { addComment, deleteComment, getComments } from "../Controllers/comments.js";
import { verify } from "../verifyToken.js";

const router = express.Router();

router.post("/", verify,addComment);
router.delete("/:id",verify, deleteComment);
router.get("/:videoId", getComments);

export default router;
