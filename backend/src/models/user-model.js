import mongoose from "../db/db-config.js";

const UserSchema = new mongoose.Schema({
    username: String,
    email: {
        type: String,
        required : true
    },
    password: {
        type: String,
        required : true
    },
    role: { type: String, default: 'user' }
});

const User = mongoose.model('user', UserSchema);

export default User;