const express = require('express');
const app = express();
const connectDB = require('./config/db');

// setup
connectDB();
const port = process.env.port || 5000;

// routes
app.get('/', (req, res) => res.send('Welcome to GameCatcher'));
app.use('/api/auth', require('./routes/api/auth'));

app.listen(port, () => console.log(`Server is running on port: ${port}`));
