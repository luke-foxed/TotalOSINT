const express = require('express');
const app = express();
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const path = require('path');

require('dotenv').config();

// setup
connectDB();

const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cookieParser());

// routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/scrape', require('./routes/api/scrape'));

if (process.env.NODE_ENV === 'production') {
  console.log('USING STATIC');

  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port), () => console.log(`Server is running on port: ${port}`);
