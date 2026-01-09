const Project = require('../models/Project');

// @desc    Get all projects
// @route   GET /api/projects
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ order: 1 });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Create a project
// @route   POST /api/projects
// @access  Private
exports.createProject = async (req, res) => {
    const { title, description, image, tools, liveLink, githubLink, order, isComingSoon } = req.body;
    try {
        const project = new Project({ title, description, image, tools, liveLink, githubLink, order, isComingSoon });
        const savedProject = await project.save();
        res.status(201).json(savedProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private
exports.updateProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (project) {
            project.title = req.body.title || project.title;
            project.description = req.body.description || project.description;
            project.image = req.body.image || project.image;
            project.tools = req.body.tools || project.tools;
            project.liveLink = req.body.liveLink || project.liveLink;
            project.githubLink = req.body.githubLink || project.githubLink;
            project.order = req.body.order !== undefined ? req.body.order : project.order;
            project.isComingSoon = req.body.isComingSoon !== undefined ? req.body.isComingSoon : project.isComingSoon;

            const updatedProject = await project.save();
            res.json(updatedProject);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private
exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (project) {
            await project.deleteOne();
            res.json({ message: 'Project removed' });
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
