const express = require('express');
const router = express.Router();
const User = require('../models/userModel'); // Adjust the path as needed

// Route to get user data by username
router.get('/getUserData/:username', async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username }); // Find the user by username

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Return the user data
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Could not get user data.' });
  }
});

module.exports = router;
