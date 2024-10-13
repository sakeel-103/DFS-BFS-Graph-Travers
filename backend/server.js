const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Added for JWT handling
const session = require('express-session');
const User = require('./models/User');
const { validateSignup } = require('./middlewares/validation');
const authenticateSession = require('./middlewares/authenticate');
const authenticateJWT = require('./middlewares/authenticateJWT'); // JWT Authentication Middleware

// const dijkstra = require('./utils/dijkstra');  // Dijkstra's algorithm import

dotenv.config();
const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Session management setup with enhanced security
app.use(session({
    secret: process.env.SESSION_SECRET || 'defaultSecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: process.env.NODE_ENV === 'production',  // Cookies sent over HTTPS only
        httpOnly: true,  // Prevent access via client-side JS
        sameSite: 'strict'  // Protection against CSRF attacks
    }
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
        res.status(500).json({ message: 'Error registering user' });
    }
});

// User login endpoint with JWT
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
master
            return res.status(400).send('Invalid credentials');
=======
            return res.status(400).json({ message: 'Invalid credentials' });
master
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

<<<master
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
=======
        // Regenerate session ID after successful login
        req.session.regenerate((err) => {
            if (err) {
                console.error('Session regeneration error:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }

            req.session.userId = user._id;
            req.session.username = user.username;
            res.json({ message: 'Logged in successfully' });
    master
        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Graph analysis functions
function detectCycle(graph) {
    // Placeholder for cycle detection logic (DFS)
    return "Cycle detection not implemented";
}

function findConnectedComponents(graph) {
    // Placeholder for finding connected components (DFS/BFS)
    return "Connected components detection not implemented";
}

function calculateNodeDegree(graph, node) {
    if (!graph[node]) return 0;
    return graph[node].length;  // Degree of a node based on adjacency list
}

// Graph analysis endpoint
app.post('/api/graph-analysis', (req, res) => {
    const { graph, analysisType, node } = req.body;
    
    if (!graph) {
        return res.status(400).send('Graph data is required');
    }

    try {
        let result;
        switch (analysisType) {
            case 'cycle-detection':
                result = detectCycle(graph);
                break;
            case 'connected-components':
                result = findConnectedComponents(graph);
                break;
            case 'node-degree':
                if (!node) return res.status(400).send('Node is required for degree calculation');
                result = calculateNodeDegree(graph, node);
                break;
            default:
                return res.status(400).send('Invalid analysis type');
        }

        res.json({ result });
    } catch (error) {
        console.error('Error in graph analysis:', error);
        res.status(500).send('Error analyzing graph');
    }
});

// Endpoint for Dijkstra's algorithm
app.post('/api/dijkstra', (req, res) => {
    const { graph, start } = req.body;
    if (!graph || !start) {
        return res.status(400).send('Graph and start node required');
    }
    try {
        const result = dijkstra(graph, start); // Assuming dijkstra logic exists in utils
        res.json({ distances: result });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error calculating shortest path');
    }
});

master
// Protected route with session and JWT authentication
app.get('/api/protected', authenticateSession, authenticateJWT, (req, res) => {
    res.send('This is a protected route, and you are authorized');
=======
// Example of a protected route
app.get('/api/protected', authenticateSession, (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    res.json({ message: 'This is a protected route' });
master
});

// User logout endpoint
app.post('/api/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Could not log out' });
        }
        res.json({ message: 'Logout successful' });
    });
});

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'An internal server error occurred',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
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
