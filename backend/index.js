const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 9000;


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected successfully');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: { type: String, default: 'user' }
});
const User = mongoose.model('user', UserSchema);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

app.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching users' });
    }
});

app.get('/insert', async (req, res) => {
    try {
        const result = await User.create([
            { name: 'Andya Johnson', email: 'alice.johnson@example.com', password: 'password123', role: 'admin' },
            { name: 'Bablya Smith', email: 'bob.smith@example.com', password: 'password456', role: 'user' },
            { name: 'Chidya Brown', email: 'charlie.brown@example.com', password: 'password789', role: 'user' }
        ]);
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: 'Error inserting data', error: err.message });
    }
});

