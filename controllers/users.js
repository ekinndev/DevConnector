const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const jwt = require('jsonwebtoken');
exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  res.send('User Route');
};
