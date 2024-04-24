const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/routes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', (error) => {
  console.error('Failed to connect to MongoDB:', error);
});
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
