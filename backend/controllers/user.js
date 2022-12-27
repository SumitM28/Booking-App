import User from "../models/User.js";

export const updateUser = async (req, res, next) => {


    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body }, 
            { new: true })

        res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    }
}
export const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).send('delete user')

    } catch (err) {
        next(err);
    }
}
export const getUser = async (req, res, next) => {

    try {
        const user = await User.findById(req.params.id);
        res.status(200).send(user);
    }
    catch (err) {
        next(err)
    }
}

export const getUsers = async (req, res, next) => {


    // const failed=false;
    // if(failed){
    //     return next(createError(401,"You are not authenticated!"))
    // }

    try {
        const users = await User.find();
        res.status(200).send(users);
    }
    catch (err) {
        next(err);
    }
}