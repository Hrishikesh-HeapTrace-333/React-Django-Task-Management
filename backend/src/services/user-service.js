import bcrypt from 'bcrypt';
import User from "../models/user-model.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const getAllUser = async () => {
    const users = await User.find();
    return users;
};

const loginUser = async (body, header) => {
    try {
        const user = body?.user;  // Safely access body.user
        const token = header?.authorization?.replace('Bearer ', '');  // Safely access token and remove 'Bearer ' if present
        
        if (!user || !token) {
            throw new Error('Missing user or token');
        }

        return { message: 'success', user: user, token: token };
    } catch (error) {
        console.error('Error during login:', error.message || error);
        throw new Error('Internal Server Error');
    }
};

const registerUser = async (header, body) => {
    const salt = 10;
    try {
        body.password = await bcrypt.hash(body.password, salt);
        const user = new User(body);
        await user.save();
        return { message: 'success'};
    } catch (error) {
        console.error('Error during registration:', error);
        throw new Error('Internal Server Error');
    }
}

export default {
    getAllUser,
    loginUser,
    registerUser
};
