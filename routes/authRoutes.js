const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

// Définir les routes pour gérer les requêtes d'inscription et de connexion
// Créer un nouveau compte utilisateur
router.post('/signup', authController.signup);

// Se connecter avec un compte déja existant
router.post('/login', authController.login);

module.exports = router;
