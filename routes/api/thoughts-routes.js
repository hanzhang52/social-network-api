const router = require('express').Router();
const {
  getAllThoughts,
  getthoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughts-controller');

// Routing /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);

// Routing /api/thoughts/:id
router
  .route('/:id')
  .get(getthoughtById)
  .put(updateThought)
  .delete(deleteThought);

//	Routing /api/thoughts/:id/reactions
router.route('/:id/reactions').post(createReaction);

// Routing /api/thoughts/:id/reactions/:reactionId
router.route('/:id/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
