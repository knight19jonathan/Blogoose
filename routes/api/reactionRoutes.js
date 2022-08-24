const router = require('express').Router();
const {
    getReactions,
    getSingleReaction,
    createReaction,
    updateReaction,
    deleteReaction
} = require('../../controllers/reactionController');

// /api/reactions
router.route('/').get(getReactions);

// /api/reactions/:id

router.route('/:id').get(getSingleReaction).put(updateReaction).delete(deleteReaction).post(createReaction);

module.exports = router;