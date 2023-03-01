const Project = require('../models/projects.model');

module.exports = ({
// CREATE (POST)
    createProject: (req, res) => {
      Project.create(req.body)
        .then((newProject) => res.json(newProject))
        .catch((err) => res.status(400).json(err))
    }, 
// READ (GET)
    findAllProjects: (req, res) => {
      Project.find().sort({dueDate: 1})
        .then((allProjects) => res.json(allProjects))
        .catch((err) => res.status(400).json({message: "Something went wrong druing find", error: err}))
    }, 
    findOneProject: (req, res) => {
      Project.findById(req.params.id)
        .then((oneProject) => res.json(oneProject))
        .catch((err) => res.status(400).json({message: "Something went wrong during find", error: err}))
    }, 
    findBackLogs: (req, res) => {
      Project.find({status: "Backlog"})
        .then((backlogs) => res.json(backlogs))
        .catch((err) => res.status(400).json({message: "Something went wrong during find", error: err}))
    }, 
    findInProgress: (req, res) => {
      Project.find({status: "In Progress"})
        .then((inProgress) => res.json(inProgress))
        .catch((err) => res.status(400).json({message: "Something went wrong during find", error: err}))
    }, 
    findCompleted: (req, res) => {
      Project.find({status: "Completed"})
        .then((completed) => res.json(completed))
        .catch((err) => res.status(400).json({message: "Something went wrong during find", error: err}))
    }, 
// UPDATE(PUT)
    updateProject: (req, res) => {
        Project.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
            .then((updatedProject) => res.json(updatedProject))
            .catch((err) => res.status(400).json(err))
    }, 
// DELETE (DELETE)
    deleteProject: (req, res) => {
        Project.findByIdAndDelete(req.params.id)
            .then((deletedProject) => res.json({message: "Successfully deleted the Project", project: deletedProject}))
            .catch((err) => res.status(400).json({message: "Something went wrong during delete", error: err}))
    }
});