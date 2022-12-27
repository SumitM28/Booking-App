import Room from '../models/Room.js'
import Hotel from '../models/Hotel.js';
import {createError} from '../utils/Error.js';


export const createRoom=async (req,res,next)=>{

    const hotelid=req.params.hotelid;
    const newRoom=new Room(req.body);

    try {
        const savedRoom=await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelid,{
                $push:{rooms:savedRoom._id}
            })
            res.status(201).send(savedRoom);
        } catch (error) {
           next(error); 
        }

    } catch (error) {
        next(error); 
    }
}

export const updateRoom= async (req,res,next)=>{

    try {
        const updatedRoom=Room.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedRoom);
    } catch (error) {
        next(err);
    }
}

export const deleteRoom=async (req,res)=>{
    const hotelid=req.params.hotelid;
    try {
        
        try {
            await Hotel.findByIdAndUpdate(hotelid,{
                $pull:{rooms:req.params.id}
            })
            res.status(201).send("Room deleted!");
        } catch (error) {
           next(error); 
        }

    }
    catch(err){
        next(err);
    }
}
export const getRoom= async (req,res,next)=>{

    try{
        const room=await Room.findById(req.params.id);
        res.status(200).send(room);
    }
    catch(err){
        next(err)
    }
}

export const getRooms=async (req,res,next)=>{


    // const failed=false;
    // if(failed){
    //     return next(createError(401,"You are not authenticated!"))
    // }

    try{
        const rooms=await Room.find();
        res.status(200).send(rooms);
    }
    catch(err){
        next(err);
    }
}