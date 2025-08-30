const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({

    name: { type: String },
    userName:{type:String},
    email: { type: String },
    phone:{type:String},
    password: { type: String },
    role: {
        type: String,
        enum: ["admin", "student", "courseProvider"],
        default: "student"
    },
    photo: {
        type: String
    },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],

})

module.exports = mongoose.model("User", UserSchema)