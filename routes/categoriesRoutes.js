// Importer le module express pour créer un routeur
const express = require('express');
const router = express.Router();

// Importer les contrôleurs et les middlewares nécessaires
const categoriesController = require('../controllers/categoriesController');
const checkAuth = require('../middlewares/checkAuth');
const checkAdmin = require('../middlewares/checkAdmin');

// Définir les routes pour gérer les requêtes liées aux catégories
router.get('/categories', categoriesController.getCategories);
router.get('/categories/:id', categoriesController.getCategoryById);
// Créer une nouvelle catégorie (obligatoirement d'être authentifié et administrateur)
router.post('/categories', checkAuth, checkAdmin, categoriesController.createCategory);
router.put('/categories/:id', checkAuth, checkAdmin, categoriesController.updateCategory);
router.delete('/categories/:id', checkAuth, checkAdmin, categoriesController.deleteCategory);

// Exporter le routeur
module.exports = router;
