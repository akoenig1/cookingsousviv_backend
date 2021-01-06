import mongoose from 'mongoose';
import { stringify } from 'uuid';
import findOrCreate from "mongoose-findorcreate"

const Schema = mongoose.Schema;
const userSchema = new Schema ({
    id: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    imageUrl: { type: String },
    admin: { type: Boolean, required: true },
    comments: [{ type: String }],
    likes: [{ type: Boolean }]
})

userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

export default User;