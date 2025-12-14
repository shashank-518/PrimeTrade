import express from "express";
import dotenv from 'dotenv'
import cors from "cors"
import connectDB from "./Config/db.js";
import AuthRoute from "./Routes/Auth.routes.js"
import cookieParser from "cookie-parser";
import TaskRoute from "./Routes/Task.routes.js"
import { authMiddleware } from "./Middleware/AuthMiddleware.js";

dotenv.config()

const PORT = process.env.PORT 


const app = express()


app.use(cookieParser())
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
connectDB()

app.use("/api/auth", AuthRoute)
app.use("/api/tasks",authMiddleware,TaskRoute)

app.get("/",(req,res)=>{
    res.send("App is running")
})

app.listen(PORT , ()=> {
    console.log(`Server is running at port ${PORT}`);
})

