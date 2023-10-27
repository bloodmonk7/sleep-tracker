const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

router.post('/createUser', (req, res) => {
  const { username, password } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res
        .status(500)
        .json({ error: 'Could not create user.' });
    }

    const newUser = new User({
      username,
      password: hashedPassword, // Store the hashed password
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
});

module.exports = router;
