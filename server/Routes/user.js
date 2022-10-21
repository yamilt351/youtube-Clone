import express from "express";
import {deleteUser, dislike, getOne, like, subscribe, unsubscribe, update} from "../Controllers/user.js";
import { verify } from "../verifyToken.js";

const router = express.Router();

// update user 
router.put("/:id",verify, update)
// delete user 
router.delete("/delete/:id", verify,deleteUser);
// get a user 
router.get("/find/:id",getOne)//-----
// subscribe a user 
router.put("/sub/:id", verify,subscribe);
// unscribe a user 
router.put("/unsub/:id", verify,unsubscribe);
// like a video
router.put("/like/:videoId", verify,like);
// dislike a video 
router.put("/dislike/:videoId",verify, dislike)

export default router;
