const express = require('express');
const router = express.Router();
const { submitMessage, getMessages, deleteMessage } = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', submitMessage);
router.get('/', protect, getMessages);
router.delete('/:id', protect, deleteMessage);

module.exports = router;
