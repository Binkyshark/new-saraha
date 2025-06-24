
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    confirmemail: { type: Boolean, default: false },
    gender: { type: String, default: 'male', enum: ['male', 'female'] },
    phone: String,
    profileimage: String,
    coverimage: [String],
}, {
    timestamps: true
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
