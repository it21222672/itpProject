const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const payment = new Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true
        }, stdNo: {
            type: String,
            required: true
        },
        subject: {
            type: String,
            required: true,
        },
        classType: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        picture: {
            type: String,
            required: true,
        },
        realPrice: {
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);
const payment_Schema = mongoose.model(
    "payment",
    payment
);
module.exports = payment_Schema;
