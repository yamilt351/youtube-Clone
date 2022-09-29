import express from "express";
import {signin, signup} from "../Controllers/auth.js";

const router = express.Router();

// CREATE USER
router.post("/signup", signup);
// SIGN IN 
router.post("/signin",signin);




export default router;
