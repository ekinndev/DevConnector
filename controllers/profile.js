const Profile = require('../models/Profile');
const User = require('../models/User');
const { validationResult } = require('express-validator');
const config = require('config');
const request = require('request-promise');

//@route  GET api/profile/me
//@desc   Get current user profile
//@access Private
exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error!');
  }
};
//@route  Post api/profile/
//@desc   Create or update  user profile
//@access Private
exports.createOrUpdateProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin,
  } = req.body;
  const profileFields = {};
  profileFields.user = req.user.id;
  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (status) profileFields.status = status;
  if (githubusername) profileFields.githubusername = githubusername;
  if (skills) {
    profileFields.skills = skills.split(',').map((skill) => skill.trim());
  }
  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (instagram) profileFields.social.instagram = instagram;
  try {
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

//@route  GET api/profile
//@desc   Get All  profiles
//@access Public
exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
//@route  GET api/profile/user/:user_id
//@desc   Get profile by userid
//@access Public
exports.getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);
    if (!profile)
      return res
        .status(400)
        .json({ msg: 'There is no profile for this user!' });
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res
        .status(400)
        .json({ msg: 'There is no profile for this user!' });
    }
    res.status(500).send('Server Error');
  }
};
//@route  Delete api/profile
//@desc   Delete Profile, user,posts
//@access Private
exports.deleteUser = async (req, res) => {
  try {
    //@todo -remove users posts
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User Deleted' });
  } catch (err) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
//@route  PUT api/profile/experience
//@desc   Add profile experience
//@access Private
exports.addExperience = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { title, company, location, from, to, current, description } = req.body;
  const newExp = { title, company, location, from, to, current, description };
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.experience.unshift(newExp);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
//@route  DELETE api/profile/experience/:exp_id
//@desc   Delete Experience from profile
//@access Private
exports.deleteExperience = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const removeIndex = profile.experience.findIndex(
      (exp) => exp.id === req.params.exp_id
    );
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

//@route  PUT api/profile/education
//@desc   Add profile Education
//@access Private
exports.addEducation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = req.body;
  const newEdu = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  };
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.education.unshift(newEdu);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
//@route  DELETE api/profile/Education/:edu_id
//@desc   Delete Education from profile
//@access Private
exports.deleteEducation = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const removeIndex = profile.education.findIndex(
      (edu) => edu.id === req.params.edu_id
    );
    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
//@route  Get api/profile/github/:username
//@desc   Get Github Repos
//@access Public
exports.getGithubRepo = async (req, res) => {
  try {
    let options = {
      uri: `https://api.github.com/users/${req.params.username}/repos`,
      qs: {
        per_page: 5,

        client_id: `${config.get('githubClientId')}`,
        client_secret: `${config.get('githubSecret')}`,
      },
      headers: {
        'User-Agent': 'node.js',
      },
      json: true, // Automatically parses the JSON string in the response
    };
    const response = await request(options);

    res.json(response);
  } catch (err) {
    console.error(err.message);
    if (err.statusCode === 404) {
      return res.status(404).json({ msg: 'No github profile found' });
    }
    res.status(500).send('Server Error');
  }
};
