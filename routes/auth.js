const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const { user } = require("../prisma/db");

// @route    GET api/auth
// @desc     Get logged in user
// @access   Private
router.get("/", (req, res) => {
  res.send("Get logged in user");
});

// @route    POST api/auth
// @desc     Auth user & get token
// @access   Public
router.post(
  "/",
  [check("email", "Please include valid email").isEmail()],
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).exists(),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    try {
      let aUser = await user.findUnique({
        where: {
          email,
        },
      });

      console.log(aUser);

      if (!aUser) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      const isMatch = await bcrypt.compare(password, aUser.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      const payload = {
        user: {
          id: aUser.id,
        },
      };

      const token = jwt.sign(payload, process.env.jwtSecret, {
        expiresIn: "30d",
      });

      res.status(200).json({
        success: true,
        token,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }

    res.send("Log user in");
  }
);

module.exports = router;
