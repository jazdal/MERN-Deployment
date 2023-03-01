const ProjectController = require("../controllers/projects.controller");
const {authenticate} = require("../config/jwt.config");

module.exports = (app) => {
    app.post('/api/projects', ProjectController.createProject);
    app.get('/api/projects', authenticate, ProjectController.findAllProjects);
    app.get('/api/projects/backlog', authenticate, ProjectController.findBackLogs);
    app.get('/api/projects/inprogress', authenticate, ProjectController.findInProgress);
    app.get('/api/projects/completed', authenticate, ProjectController.findCompleted);
    app.get('/api/projects/:id', ProjectController.findOneProject);
    app.put('/api/projects/:id', ProjectController.updateProject);
    app.delete('/api/projects/:id', ProjectController.deleteProject);
};