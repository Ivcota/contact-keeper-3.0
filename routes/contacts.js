const express = require("express");
const router = express.Router();
const { contact } = require("../prisma/db");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

// @route   GET api/contacts
// @desc    Get all user's contacts
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await contact.findMany({
      where: {
        userId: req.user.id,
      },
    });

    res.status(200).json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    console.error(error);
  }
});

// @route   POST api/contacts
// @desc    Add new contact by user
// @access  Private
router.post(
  "/",
  [auth, [check("name", "Name is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = await contact.create({
        data: {
          name,
          email,
          phone,
          type,
          userId: req.user.id,
        },
      });

      res.json({ success: true, data: newContact });
    } catch (error) {
      console.error(error);
      res.send(error);
    }
  }
);

// @route   PUT api/contacts/:id
// @desc    Update specific contact
// @access  Private
router.put("/:id", (req, res) => {
  res.send("Update specific contact");
});

// @route   DELETE api/contacts/:id
// @desc    Get all user's contacts
// @access  Private
router.delete("/:id", (req, res) => {
  res.send("Get all contacts");
});

module.exports = router;
