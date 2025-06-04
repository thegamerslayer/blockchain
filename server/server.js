// server.js - COMPLETE REPLACEMENT
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Schemas
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    email: { type: String, unique: true }
});

const networkSchema = new mongoose.Schema({
    name: String,
    version: String,
    description: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Network = mongoose.model('Network', networkSchema);

// Auth Middleware
const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Authentication required' });
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId);
        if (!req.user) throw new Error('User not found');
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

// Routes
app.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        if (await User.findOne({ username })) {
            return res.status(400).json({ message: "Username exists" });
        }
        
        if (await User.findOne({ email })) {
            return res.status(400).json({ message: "Email exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token, username });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, username });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

app.get('/networks', authenticate, async (req, res) => {
    try {
        const networks = await Network.find({ createdBy: req.user._id });
        res.json(networks);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

app.post('/networks', authenticate, async (req, res) => {
    try {
        const network = new Network({
            ...req.body,
            createdBy: req.user._id
        });
        await network.save();
        res.status(201).json(network);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));