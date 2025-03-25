const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const { resolve } = require('path');
const routes = require('./routes');

const app = express();
app.use(express.json());
app.use(routes);

const port = process.env.PORT || 3000;
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        console.log('Retrying connection in 5 seconds...');
        setTimeout(connectDB, 5000);
    }
};

// Connect to MongoDB
connectDB();


app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
