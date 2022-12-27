import { Router } from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js";
import {verifyAdmin, verifyToken, verifyUser} from "../utils/verifyToken.js"
const router=Router();

// router.get('/checkauthentication',verifyToken,(req,res,next)=>{
//     res.send('you are log in')
//     next();
// })
// router.get('/checkuser/:id',verifyUser,(req,res,next)=>{
//     res.send('you are log in now you can delete your account.')
//     next();
// })
// router.get('/checkadmin/:id',verifyAdmin,(req,res,next)=>{
//     res.send('you are log in now you can delete your account.')
//     next();
// })

// UPDATE
router.put('/:id',verifyUser,updateUser)
// DELETE
router.delete('/:id',verifyUser,deleteUser)
// GET
router.get('/:id',verifyUser, getUser)
// GET ALL
router.get('/',verifyAdmin, getUsers)

export default router; 