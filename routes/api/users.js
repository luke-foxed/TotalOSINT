const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// create user
router.post(
  '/create',
  [
    check('username', 'Username is required').notEmpty(),
    check('email', 'Please provide a valid email').isEmail(),
    check(
      'password',
      'Please enter a password between 8 to 24 characters'
    ).isLength({ min: 8, max: 24 }),
    check(
      'password',
      'Password must contain at least one letter, special character and number'
    ).matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{0,}$/),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, preferences } = req.body;

    try {
      let user = await User.findOne({ username });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      // generate random number for random avatar
      let randNum = Math.floor(Math.random() * 11);
      let colors = ['63db83', '63c1db', 'db63ab', 'dbaf63'];
      let randCol = colors[Math.floor(Math.random() * colors.length)];

      let avatar = `https://api.adorable.io/avatars/face/eyes${randNum}/nose${randNum}/mouth${randNum}/${randCol}/300`;

      user = new User({
        username,
        email,
        password,
        preferences,
        avatar,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

/**
 * @route    DELETE api/users/delete
 * @desc     Delete user from DB
 * @access   Private
 */

router.delete('/delete', auth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.status(200).json({ msg: 'Account Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Delete Error' });
  }
});

module.exports = router;
