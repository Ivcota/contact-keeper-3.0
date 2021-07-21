const express = require("express");
const router = express.Router();
const { contact } = require("../prisma/db");
const auth = require("../middleware/auth");

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
// @desc    Add new contact
// @access  Private
router.post("/", (req, res) => {
  res.send("Add contact");
});

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
