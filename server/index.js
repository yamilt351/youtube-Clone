import  express  from "express";
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoutes from "./Routes/user.js"
import videoRoutes from "./Routes/videos.js";
import commentsRoutes from "./Routes/comments.js";
import authRoutes from "./Routes/auth.js"
import cookieParser from "cookie-parser";


const app = express()
dotenv.config()

const connect= () =>{
    mongoose.connect(process.env.MONGO).then(() => {
        console.log("connected to mongoose")
    }).catch(err => {
        throw err;
    })
}

app.use(express.json())

app.use(cookieParser())

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/videos", videoRoutes);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong"
    return res.status(status).json({
        success: false,
        status,
        message
    })
})


app.listen(8000, () => {
    connect()
    console.log("conected")
})