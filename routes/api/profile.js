const express = require('express');
const profileController = require('../../controllers/profile');
const router = express.Router();
const auth = require('../../middleware/is-auth');
const { check } = require('express-validator');

router.get('/me', auth, auth, profileController.getProfile);
router.post(
  '/',

  auth,
  [
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills are required').not().isEmpty(),
  ],
  profileController.createOrUpdateProfile
);
module.exports = router;
