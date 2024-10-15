const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const session = require('express-session');
const multer = require('multer');  // For file uploads
const fs = require('fs');  // For reading file contents
const User = require('./models/User');
const { validateSignup } = require('./middlewares/validation');
const authenticateSession = require('./middlewares/authenticate');
const http = require('http');
const { Server } = require('socket.io');

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Session management setup with enhanced security
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


app.post('/api/contact', (req, res) => {
    const { email, question, feedback, suggestion } = req.body;

    // Process the contact form data (e.g., save to a database or send an email)
    console.log('Contact form submitted:', req.body);
    
    // Respond with a success message
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
            // Parse the file into an adjacency list or matrix (depending on format)
            const graph = parseGraph(data);
            res.json({ graph });
        } catch (err) {
            console.error('Error parsing graph:', err);
            res.status(500).json({ message: 'Error parsing graph' });
        }
    });
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
        // Emit the update to all connected clients
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
