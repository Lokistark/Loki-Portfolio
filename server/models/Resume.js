const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
    resumeUrl: {
        type: String,
        required: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Resume', ResumeSchema);
