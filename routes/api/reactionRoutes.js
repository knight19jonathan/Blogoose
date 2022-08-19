const router = require('express').Router();
const {
    getReactions,
    getSingleReaction,
    createReaction,
    updateReaction,
    deleteReaction
} = require('../../controllers/reactionController');

// /api/reactions
router.route('/').get(getReactions).post(createReaction);

// /api/reactions/:id

router.route('/:id').get(getSingleReaction).put(updateReaction).delete(deleteReaction);

module.exports = router;