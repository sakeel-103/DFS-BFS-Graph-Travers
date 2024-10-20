const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const session = require('express-session');
const multer = require('multer');
const fs = require('fs');
const User = require('./models/User');
const { validateSignup } = require('./middlewares/validation');
const http = require('http');
const { Server } = require('socket.io');
const WebSocket = require('ws');

// Load environment variables
dotenv.config();

// Create Express app and HTTP server
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const wss = new WebSocket.Server({ port: 5001 });

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Session management with enhanced security
app.use(session({
    secret: process.env.SESSION_SECRET || 'defaultSecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'strict'
    }
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Multer setup for file uploads
const upload = multer({ dest: 'uploads/' });

// WebSocket server
wss.on('connection', (ws) => {
    console.log('WebSocket client connected');

    ws.on('message', (message) => {
        console.log('Received:', message);
        ws.send('Hello from server!');
    });

    ws.on('close', () => {
        console.log('WebSocket client disconnected');
    });
});

console.log('WebSocket server is running on ws://localhost:5001/');

// API endpoints
app.post('/api/contact', (req, res) => {
    const { email, question, feedback, suggestion } = req.body;
    console.log('Contact form submitted:', req.body);
    res.status(200).json({ message: 'Contact form submitted successfully' });
});

// Endpoint for uploading and parsing the graph file
app.post('/api/upload-graph', upload.single('graphFile'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = req.file.path;

    // Read the file content
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ message: 'Error reading file' });
        }

        try {
            const graph = parseGraph(data);
            res.json({ graph });
        } catch (err) {
            console.error('Error parsing graph:', err);
            res.status(500).json({ message: 'Error parsing graph' });
        }
    });
});

// User signup endpoint
app.post('/api/signup', validateSignup, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });

        await newUser.save();
        req.session.userId = newUser._id; // Set user ID in session
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// User login endpoint
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        req.session.userId = user._id; // Set user ID in session
        res.status(200).json({ message: 'User signed in successfully' });
    } catch (error) {
        console.error('Error during signin:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Utility function to parse graph from file (Adjacency list)
function parseGraph(data) {
    const lines = data.split('\n');
    const graph = {};

    lines.forEach(line => {
        const nodes = line.trim().split(/\s+/);
        if (nodes.length > 0) {
            const node = nodes[0];
            const edges = nodes.slice(1);
            graph[node] = edges;
        }
    });

    return graph;
}

// Socket.IO event for real-time collaboration
io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for graph updates from the client
    socket.on('updateGraph', (data) => {
        socket.broadcast.emit('graphUpdated', data);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('Shutting down gracefully...');
    await mongoose.connection.close();
    process.exit(0);
});
