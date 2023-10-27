const express = require('express');
const app = express();
const port = process.env.PORT || 10000;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const cors = require('cors');
dotenv.config();

const createUserRoutes = require('./routes/createUser');
const sleepDataRoutes = require('./routes/sleepData');
const getUserDataRoutes = require('./routes/getUserData');

app.use(express.json());
app.use('/user', createUserRoutes);
app.use('/sleep', sleepDataRoutes);
app.use('/user', getUserDataRoutes);
app.use(cors());

const dbUri = process.env.URI;

mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on(
  'error',
  console.error.bind(console, 'MongoDB connection error:')
);
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});

app.get('/', async (req, res) => {
  res.send({
    Message: 'Hello, I am API!',
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
