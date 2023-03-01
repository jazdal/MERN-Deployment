const UserController = require("../controllers/users.controller");
const {authenticate} = require("../config/jwt.config");

module.exports = (app) => {
  app.post('/api/register', UserController.register);
  app.get('/api/users', authenticate, UserController.findAllUsers);
  app.get('/api/users/:id', UserController.findOneUser);
  app.post('/api/login', UserController.login);
  app.get('/api/logout', UserController.logout);
  app.delete('/api/users', UserController.deleteAllUsers);
  app.delete('/api/users/:id', UserController.deleteOneUser);
};