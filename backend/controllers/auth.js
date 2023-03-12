import User from "../models/User.js";
import bcrypt from 'bcrypt'
import { createError } from '../utils/Error.js'
import jwt from "jsonwebtoken";
export const register = async (req, res, next) => {

    try {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const password = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({
            userName: req.body.username,
            email: req.body.email,
            password: password
        });

        await newUser.save();
        res.status(201).send("user has been created.")
    } catch (error) {
        next(error);
    }
}


export const login = async (req, res, next) => {

    try {
        // checking the user by username.
        const user = await User.findOne({ userName: req.body.userName })
        if (!user) return next(createError(404, "User not found!"))

        // check the user password is correct or not.
        const isPassword = await bcrypt.compare(req.body.password, user.password)
        if (!isPassword) return next(createError(400, "Worng password or username!"))

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT)
        const { password, isAdmin, ...otherDetails } = user._doc;
        // console.log({ ...otherDetails })

        res.cookie("access_token", token, {
            httpOnly:true
        }).status(200).send("you are loged in!")
        
    } catch (error) {
        next(error);
    }

}