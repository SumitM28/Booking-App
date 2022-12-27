import mongoose from "mongoose";


var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new mongoose.Schema({

        userName: {
            type: String,
            unique: true,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
            validate: [validateEmail, 'Please fill a valid email address']
        },
        password: {
            require: true,
            type: String
        },
        isAdmin: {
            type: Boolean,
            default: false
        },

    }, 
    {
        timestamps: true
    }
)


export default new mongoose.model('User', userSchema);