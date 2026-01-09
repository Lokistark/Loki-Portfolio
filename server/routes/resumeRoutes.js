const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');
const { protect } = require('../middleware/authMiddleware');

// Get resume
router.get('/', async (req, res) => {
    try {
        const resume = await Resume.findOne();
        res.json(resume);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update resume (Protected)
router.post('/', protect, async (req, res) => {
    const { resumeUrl } = req.body;
    try {
        let resume = await Resume.findOne();
        if (resume) {
            resume.resumeUrl = resumeUrl;
            resume.updatedAt = Date.now();
            await resume.save();
        } else {
            resume = await Resume.create({ resumeUrl });
        }
        res.json(resume);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete resume (Protected)
router.delete('/', protect, async (req, res) => {
    try {
        await Resume.deleteMany({});
        res.json({ message: 'Resume deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
