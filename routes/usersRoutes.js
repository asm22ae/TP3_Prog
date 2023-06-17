const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');
const checkAuth = require('../middlewares/checkAuth');
const checkAdmin = require('../middlewares/checkAdmin');

router.get('/users', usersController.getUsers);
router.get('/users/profile', checkAuth, usersController.getProfile);
router.get('/users/:id', usersController.getUserById);
router.put('/users/:id', checkAuth, usersController.updateUser);
router.delete('/users/:id', checkAuth, usersController.deleteUser);

module.exports = router;

