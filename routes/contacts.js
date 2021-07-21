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
router.put("/:id", [auth], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({
      mesg: errors.array(),
    });
  }

  const { id } = req.params;
  const parsedId = parseInt(id);

  const { name, email, phone, type } = req.body;

  try {
    const editedContact = await contact.update({
      data: {
        name,
        email,
        phone,
        type,
      },
      where: {
        id: parsedId,
      },
    });

    res.status(200).json({
      success: true,
      data: editedContact,
    });
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});

// @route   DELETE api/contacts/:id
// @desc    Get all user's contacts
// @access  Private
router.delete("/:id", auth, (req, res) => {
  // Delete contact with matching id

  const { id } = req.params;
  const parsedId = parseInt(id);

  try {
    const deletedContact = contact.delete({
      where: {
        id: parsedId,
      },
    });

    res.status(200).json({
      success: true,
      msg: `Contact with with id ${id} has been deleted.`,
    });
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});

module.exports = router;
