const express = require("express");
const router = express.Router();
const passport = require("passport");

const UpDownVote = require("../../models/UpDownVote");
const User = require("../../models/User");

// @route   GET api/userdata/
// @desc    Get all userdata (right now its just user votes)
// @access  Public
router.get("/", (req, res) => {
  // if (!req.user) return res.status(404).json({ errorMsg: "Not logged in" });

  const errors = {};

  UpDownVote.find({ userCreator: req.user.id })
    //.populate('user', ['name', 'avatar']) //If I only want specific fields
    .then(votes => {
      res.json(votes);
    })
    .catch(err =>
      res.status(404).json({ errorMsg: "There was a problem getting votes" })
    );
});

module.exports = router;
