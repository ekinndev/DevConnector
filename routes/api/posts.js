const express = require('express');
const postController = require('../../controllers/posts');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../../middleware/is-auth');

router.post(
  '/comment/:id',
  auth,
  [check('text', 'Text is required').not().isEmpty()],
  postController.addComment
);
router.delete('/comment/:id/:comment_id',auth, postController.deleteComment);
router.put('/like/:id', auth, postController.likePost);
router.put('/unlike/:id', auth, postController.unLikePost);
router.get('/:id', auth, postController.getSinglePost);
router.delete('/:id', auth, postController.deleteSinglePost);
router.post(
  '/',
  auth,
  [check('text', 'Text is required').not().isEmpty()],
  postController.addPosts
);
router.get('/', auth, postController.getAllPosts);

module.exports = router;
