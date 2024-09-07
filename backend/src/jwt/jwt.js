import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'No token provided.' });
    }
    const extractedToken = token.startsWith('Bearer ') ? token.split(' ')[1] : token;

    jwt.verify(extractedToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized!' });
        }
        req.userId = decoded.userId;
        req.role = decoded.role;
        next();
    });
};

export default verifyToken;
