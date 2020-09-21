const express = require('express');
const app = express();
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// setup
connectDB();

const port = process.env.port || 5000;

// middleware
app.use(express.json());
app.use(cookieParser());

// routes
app.get('/', (req, res) => res.send('Welcome to GameCatcher'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/scrape', require('./routes/api/scrape'));

app.listen(port, () => console.log(`Server is running on port: ${port}`));
