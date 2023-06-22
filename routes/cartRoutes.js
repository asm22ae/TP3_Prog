
// Importer le module express pour créer un routeur
const express = require('express');
const router = express.Router();
// Importer les contrôleurs et les middlewares nécessaires
const cartController = require('../controllers/cartController');
const checkAuth = require('../middlewares/checkAuth');

// Définir les routes pour gérer les requêtes liées au panier
// Récupérer le panier de l'utilisateur connecté (doit être authentifié)
router.get('/cart', checkAuth, cartController.getCart);

 // Ajouter un produit au panier de l'utilisateur connecté (doit être authentifié)
router.put('/cart', checkAuth, cartController.addProductToCart);

// Retirer un produit du panier de l'utilisateur connecté (doit être authentifié)
router.delete('/cart/:id', checkAuth, cartController.removeProductFromCart);

module.exports = router;
