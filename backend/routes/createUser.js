const express = require('express');
const router = express.Router();
const User = require('../models/userModel'); // Adjust the path as needed

const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your actual frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Enable passing cookies, sessions, and other credentials
};

router.use(cors(corsOptions));

// Route to create a user
router.post('/createUser', (req, res) => {
  const { username, password } = req.body;

  const newUser = new User({
    username,
    password,
  });

  newUser
    .save()
    .then((savedUser) => {
      res.status(201).json(savedUser);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Could not create user.' });
    });
});

module.exports = router;
