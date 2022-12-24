const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 50
        },
        isGold: {
            type: Boolean,
            default: false
        },
        phone: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 50
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Customer", CustomerSchema);

