
// Importer le module express pour créer un routeur
const express = require("express");
const router = express.Router();

// Importer les contrôleurs et les middlewares nécessaires
const productsController = require("../controllers/productsController");
const checkAuth = require("../middlewares/checkAuth");

// Définir les routes pour gérer les requêtes liées aux produits
// Récupérer tous les produits
router.get('/products', productsController.getProducts);
 // Récupérer un produit par son id
router.get('/products/:id', productsController.getProductById);
// Créer un nouveau produit
router.post('/products', checkAuth, productsController.createProduct);
// Supprimer un produit par son id
router.delete('/products/:id', checkAuth, productsController.deleteProduct);
// Récupérer les produits créés par un utilisateur
router.get('/products/user/:userId', productsController.getProductsByUser);

// Exporter le routeur
module.exports = router;
