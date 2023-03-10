const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 50
        },
        email: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 255,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 1024
        },
        isAdmin: Boolean
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);

