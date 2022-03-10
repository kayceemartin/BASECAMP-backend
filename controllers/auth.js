const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { createUserToken } = require('../middleware/auth')
const router = express.Router();

const register = async (req, res, next) => {
    console.log('registering')
    try {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(req.body.password, salt);

      const pwStore = req.body.password;

      req.body.password = passwordHash;

      const newUser = await User.create(req.body);
      if(newUser) {
          req.body.password = pwStore;
          const authenticatedUserToken = createUserToken (req, newUser);
          res.status(201).json({
              user: newUser,
              isLoggedIn: true,
              token: authenticatedUserToken,
          });
      } else {
            res.status(400).json({error: "oops something went wrong"})
        }
    }catch (err) {
        res.status(400).json({error : err.message});
    }
};

// routes/controllers here

//SIGN UP
router.post("/register", register);

//SIGNIN
router.post("/auth/login", async (req, res, next) => {});




module.exports = router;