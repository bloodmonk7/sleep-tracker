const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const createUserRoutes = require('./routes/createUser');
const sleepDataRoutes = require('./routes/sleepData');
app.use(express.json());
app.use('/user', createUserRoutes);
app.use('/sleep', sleepDataRoutes);

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
