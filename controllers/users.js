const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.post("/registration", (req, res) => {
    const passwordHash = bcrypt.hashSync(
      req.body.password,
      bcrypt.genSaltSync(10)
    );
  
    const userDbEntry = {
      username: req.body.username,
      password: passwordHash,
      email: req.body.email,
    };
  
    User.create(userDbEntry, (err, createdUser) => {
      if (err) {
        res.send(err);
      } else {
        req.session.currentUser = createdUser;
        res.redirect("/authors");
      }
    });
  });


// SIGN IN
// POST /auth/login
router.post("/login", (req, res, next) => {
    try {
      const loggingUser = req.body.username;
      const foundUser = await User.findOne({ username: loggingUser });
      const token = await createUserToken(req, foundUser);
      res.status(200).json({
        user: foundUser,
        isLoggedIn: true,
        token,
      });
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  });


  //LOGOUT
  router.get( "/logout", requireToken, async (req, res, next) => {
    try {
      const currentUser = req.user.username
      delete req.user
      res.status(200).json({
        message: `${currentUser} currently logged in`,
        isLoggedIn: false,
        token: "",
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  module.exports = router;