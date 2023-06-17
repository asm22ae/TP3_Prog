const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cartController');
const checkAuth = require('../middlewares/checkAuth');


router.get('/cart', checkAuth, cartController.getCart);
router.put('/cart', checkAuth, cartController.addProductToCart);
router.delete('/cart/:id', checkAuth, cartController.removeProductFromCart);

module.exports = router;
