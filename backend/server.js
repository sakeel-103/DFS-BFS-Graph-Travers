const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const { validationResult } = require('express-validator');
const User = require('./models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Added for JWT handling
const session = require('express-session');
const { validateSignup } = require('./middlewares/validation');
const authenticateSession = require('./middlewares/authenticate');
const authenticateJWT = require('./middlewares/authenticateJWT'); // JWT Authentication Middleware

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Session management setup
app.use(session({
    secret: process.env.SESSION_SECRET || 'defaultSecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// User registration endpoint with validation
app.post('/api/signup', validateSignup, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).send('All fields are required');
    }

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send('Username already exists');
        }

        const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new User({ username, email, password: hashedPassword });

        await newUser.save();
        res.status(201).json({ message: "User registered" });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Error registering user');
    }
});

// User login endpoint with JWT
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('All fields are required');
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).send('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid credentials');
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '1h' } // Token expiration
        );

        // Store user info in session
        req.session.userId = user._id;
        req.session.username = user.username;

        res.json({
            message: 'Logged in successfully',
            token // Send JWT token to the user
        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Internal server error');
    }
});

// Protected route with session and JWT authentication
app.get('/api/protected', authenticateSession, authenticateJWT, (req, res) => {
    res.send('This is a protected route, and you are authorized');
});

// User logout endpoint
app.post('/api/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Could not log out');
        }
        res.json({ message: 'Logout successful' });
    });
});

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace for debugging purposes
    res.status(500).json({
        message: 'An internal server error occurred',
        error: process.env.NODE_ENV === 'development' ? err.message : {} // Only send the error message in development mode
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('Shutting down gracefully...');
    await mongoose.connection.close();
    process.exit(0);
});
