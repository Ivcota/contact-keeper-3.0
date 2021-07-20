const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const { user } = require("../prisma/db");

// @route    POST api/users
// @desc    Registers User
// @access    Public
router.post(
  "/",
  [
    check("name", "Please add name").not().isEmpty(),
    check("email", "Please include valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { name, email, password } = req.body;

    try {
      let aUser = await user.findUnique({
        where: {
          email,
        },
      });

      console.log(aUser);

      if (aUser) {
        return res.status(400).json({ msg: "User already exists" });
      }

      // Gen Salt Security
      const salt = await bcrypt.genSalt(10);

      console.log(salt);
      // Hash Password
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      res.status(200).json({
        success: true,
        data: newUser,
      });
    } catch (err) {
      console.error(err.message);
    }
  }
);

module.exports = router;
