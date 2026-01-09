// This is my backend server
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// to use variables from .env file
dotenv.config();

const app = express();

// middleware to allow json and cross-origin requests
app.use(express.json());
app.use(cors());

// connecting to my mongodb database
const mongoUrl = process.env.MONGO_URI;

mongoose.connect(mongoUrl)
    .then(() => {
        console.log('--- Database connected successfully ---');
    })
    .catch((error) => {
        console.log('database error:');
        console.error(error);
    });

// setting up the API routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/api/resume', require('./routes/resumeRoutes'));

app.get('/', (req, res) => {
    res.send('API is working!');
});

// the port for the server
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`🚀 server is on port ${PORT}`));
}

module.exports = app;
