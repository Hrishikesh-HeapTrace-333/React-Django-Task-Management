import express from 'express';
import userRoutes from './src/routes/user-routes.js';
import cors from 'cors';
// import verifyToken from './src/jwt/jwt.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

const PORT = process.env.PORT || 9000;
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,  // Allow credentials
}));
app.use(express.json());

app.use((req, res, next) => {
    const openRoutes = ['/api/login', '/api/signin','/api/users'];

    if (openRoutes.includes(req.originalUrl)) {
        next();
    } else {
        // verifyToken(req, res, next);
        next();
    }
});

app.use('/api', userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/', async (req, res) => {
    try {
        res.send('working');
    } catch (err) {
        res.status(500).json({ message: 'Error fetching users' });
    }
});
