const express = require('express');
const userController = require('../../controllers/users');
const router = express.Router();
const { check } = require('express-validator');

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  userController.signup
);

module.exports = router;
