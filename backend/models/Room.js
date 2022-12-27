import mongoose from "mongoose";
const roomSchema = new mongoose.Schema(
    {

        title: {
            type: String,
            require: true
        },
        price: {
            type: Number,
            require: true
        },
        maxPeople: {
            type: Number,
            require: true
        },
        desc: {
            type: String,
            require: true
        },
        roomNumber: [{ number: Number, unavailaleDates: { type: [Date] } }]
    },
    {
        timestamps: true
    },
    { typeKey: '$type' }
)

export default mongoose.model('Room', roomSchema); 