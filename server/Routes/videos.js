import express from "express";
import {
  addVideo,
  addView,
  deleteVideo,
  getByTag,
  getVideo,
  randomVideo,
  search,
  subsVideo,
  trendVideo,
  updateVideo,
} from "../Controllers/video.js";
import { verify } from "../verifyToken.js";

const router = express.Router();

router.post("/", verify, addVideo);
router.delete("/:id", verify, deleteVideo);
router.put("/:id", verify, updateVideo);
router.put("/view/:id", addView);
router.get("/find/:id", getVideo);
router.get("/trend", trendVideo);
router.get("/random", randomVideo);
router.get("/sub", verify, subsVideo);
router.get("/tags", getByTag);
router.get("/search", search);
export default router;
