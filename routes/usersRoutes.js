// Importer le module express pour créer un routeur
const express = require('express');
const router = express.Router();

// Importer les contrôleurs et les middlewares nécessaires
const usersController = require('../controllers/usersController');
const checkAuth = require('../middlewares/checkAuth');
const checkAdmin = require('../middlewares/checkAdmin');

// Définir les routes pour gérer les requêtes liées aux utilisateurs
// Récupérer tous les utilisateurs
router.get('/users', usersController.getUsers);
// Récupérer le profil de l'utilisateur connecté
router.get('/users/profile', checkAuth, usersController.getProfile);
// Récupérer un utilisateur par son id
router.get('/users/:id', usersController.getUserById);
// Modifier un utilisateur par son id
router.put('/users/:id', checkAuth, usersController.updateUser);
// Supprimer un utilisateur par son id
router.delete('/users/:id', checkAuth, usersController.deleteUser);

// Exporter le routeur
module.exports = router;

