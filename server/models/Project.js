const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    tools: {
        type: [String],
        required: true,
    },
    liveLink: String,
    githubLink: String,
    order: {
        type: Number,
        default: 0,
    },
    isComingSoon: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
