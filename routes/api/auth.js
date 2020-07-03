const express = require('express');
const auth = require('../../middleware/is-auth');
const authController = require('../../controllers/auth');
const router = express.Router();
const { check } = require('express-validator');

router.get('/', auth, authController.getUser);
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],

  authController.login
);

module.exports = router;
