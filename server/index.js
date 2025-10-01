import express from "express";
import cors from "cors"
import env from "dotenv";
import authRouter from './routes/authRoute.js';
import emergencyRouter from './routes/emergencyRoutes.js';
import feedbackRouter from './routes/feedbackRoutes.js';
import cookieParser from "cookie-parser";


const app = express();
env.config();
app.use(cors({
     origin:process.env.CORS_ORIGIN || "http://localhost:3000",
     methods:["GET","POST","PATCH","DELETE"],
     credentials: true
}));
app.use(express.json());
app.use(cookieParser());


app.use('/auth',authRouter);
app.use('/api',emergencyRouter);
app.use('/get',feedbackRouter);

app.listen(process.env.PORT, (req,res) => {
    console.log(`Server is running successfully on the port ${process.env.PORT}`);
})