import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

// routes
import authRoute from '../backend/routes/auth.js';
import hotelsRoute from '../backend/routes/hotels.js';
import roomsRoute from '../backend/routes/rooms.js';
import usersRoute from '../backend/routes/users.js';


// port
const port =4500;

dotenv.config();


// connection with database.
const connect=async()=>{
    try {
        mongoose.connect(process.env.MONGO);
        console.log('database has been connected')
    } catch (error) {
        throw error;
    }
} 

mongoose.connection.on('disconnected',()=>{
    console.log('database disconnected!')
})
mongoose.connection.on('connected',()=>{
    console.log('database connected!')
})
mongoose.set('strictQuery', false);

const app=express();

// middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/auth',authRoute);
app.use('/api/hotels',hotelsRoute);
app.use('/api/rooms',roomsRoute);
app.use('/api/users',usersRoute);

// error handling using middleware.
app.use((err,req,res,next)=>{
    const errorStatus=err.status || 500;
    const errorMessage=err.message || "!Something went wrong!"

    res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack
    })
})

app.listen(port,()=>{
    connect();
    console.log(`server is running on the port ${port}`);
})