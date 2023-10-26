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

// Route to add sleep data to a user
router.post('/addSleepData', (req, res) => {
  const {
    userId,
    sleepProblems,
    bedtime,
    wakeupTime,
    totalSleepHours,
  } = req.body;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(404).json({ error: 'User not found.' });
      } else {
        user
          .updateOne({
            $set: {
              sleepProblems: sleepProblems || user.sleepProblems, // Keep the existing data if not provided
              bedtime: bedtime || user.bedtime,
              wakeupTime: wakeupTime || user.wakeupTime,
              totalSleepHours:
                totalSleepHours || user.totalSleepHours,
            },
          })
          .then(() => {
            // Fetch the updated user data
            User.findById(userId)
              .then((updatedUser) => {
                res.status(200).json(updatedUser);
              })
              .catch((error) => {
                res.status(500).json({
                  error: 'Could not fetch updated user data.',
                });
              });
          })
          .catch((error) => {
            res
              .status(500)
              .json({ error: 'Could not update sleep data.' });
          });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'Could not find user.' });
    });
});

module.exports = router;
