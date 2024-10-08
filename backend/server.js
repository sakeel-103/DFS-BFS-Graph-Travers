const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const { validationResult } = require('express-validator');
const User = require('./models/User');
const bcrypt = require('bcrypt');
const session = require('express-session');
const { validateSignup } = require('./middlewares/validation');
const authenticateSession = require('./middlewares/authenticate');

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

    // Check if all fields are provided
    if (!username || !email || !password) {
        return res.status(400).send('All fields are required');
    }

    try {
        // Check if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send('Username already exists');
        }

        // Hash the password
        const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new User({ username, email, password: hashedPassword });

        // Save the new user
        await newUser.save();
        res.status(201).json({ message: "User registered" });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Error registering user');
    }
});

// User login endpoint
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    // Check if all fields are provided
    if (!username || !password) {
        return res.status(400).send('All fields are required');
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).send('Invalid credentials'); // User not found
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid credentials');
        }

        // Store user info in session
        req.session.userId = user._id;
        req.session.username = user.username;
        res.json({ message: 'Logged in successfully' });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Internal server error');
    }
});

// Example of a protected route
app.get('/api/protected', authenticateSession, (req, res) => {
    if (!req.session.userId) {
        return res.status(401).send('Unauthorized');
    }
    res.send('This is a protected route');
});

// User logout endpoint
app.post('/api/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Could not log out');
        }
        res.json({ message: 'Logout successful' }); // Send a JSON response
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
