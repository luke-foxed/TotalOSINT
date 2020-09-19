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
app.use(bodyParser({ limit: '50mb' }));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
app.use(express.json({ extended: false }));
app.use(cookieParser());

// Fix cors error
app.use(
  cors({
    origin: 'http://localhost:3000', // allow to server to accept request from different origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // allow session cookie from browser to pass through
  })
);

// routes
app.get('/', (req, res) => res.send('Welcome to GameCatcher'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));

app.listen(port, () => console.log(`Server is running on port: ${port}`));
