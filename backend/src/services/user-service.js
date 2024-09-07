import bcrypt from 'bcrypt';
import User from "../models/user-model.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const getAllUser = async () => {
    const users = await User.find();
    return users;
};

const loginUser = async (body) => {
    try {
        const user = await User.findOne({ email: body.email });
        if (user && await bcrypt.compare(body.password, user.password)) {
            const token = jwt.sign(
                { userId: user.email, role: user.role }, 
                process.env.JWT_SECRET,                
                { expiresIn: '24h' }                    
            );
            return { message: 'success', user: user, token: token };
        }
        return { message: 'failed' };
    } catch (error) {
        console.error('Error during login:', error);
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
