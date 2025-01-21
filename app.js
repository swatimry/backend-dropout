import dotenv from "dotenv";
import express from "express";
import { connectdb } from "./config/database.js";
import cookieParser from "cookie-parser";


dotenv.config({path:".env"});
connectdb();
const app=express();
app.get('/',(req,res)=>{
    res.send("hello from server");
})
app.use(express.json());
app.use(cookieParser());

import authRoutes from  "./routes/authRoutes.js";
import schemeRoutes from "./routes/schemeRoutes.js";
app.use('/api/auth', authRoutes);
app.use('/api/scheme',schemeRoutes);

app.listen(process.env.PORT,()=>{
    console.log('server started on port 5000');
})
export default app;



