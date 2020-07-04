const express = require('express');
const profileController = require('../../controllers/profile');
const router = express.Router();
const auth = require('../../middleware/is-auth');
const { check } = require('express-validator');

router.get('/user/:user_id', profileController.getProfileById);
router.get('/', profileController.getAllProfiles);
router.get('/me', auth, profileController.getProfile);
router.delete('/', auth, profileController.deleteUser);
router.put(
  '/experience',
  auth,
  [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty(),
  ],
  profileController.addExperience
);
router.delete('/experience/:exp_id', auth, profileController.deleteExperience);
router.put(
  '/education',
  auth,
  [
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('fieldofstudy', 'Field Of Study is required').not().isEmpty(),

    check('from', 'From date is required').not().isEmpty(),
  ],
  profileController.addEducation
);
router.delete('/education/:edu_id', auth, profileController.deleteEducation);
router.get('/github/:username', profileController.getGithubRepo);

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
