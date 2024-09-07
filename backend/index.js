import express from 'express';
import userRoutes from './src/routes/user-routes.js';
import cors from 'cors';
import verifyToken from './src/jwt/jwt.js';
const app = express();

const PORT = process.env.PORT || 9000;
// Enable CORS
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

app.use((req, res, next) => {
    const openRoutes = ['/api/login', '/api/signin',];

    if (openRoutes.includes(req.originalUrl)) {
        next();
    } else {
        verifyToken(req, res, next);
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
