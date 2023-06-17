
const express = require("express");
const router = express.Router();

const productsController = require("../controllers/productsController");
const checkAuth = require("../middlewares/checkAuth");
const checkAdmin = require("../middlewares/checkAdmin");

router.get('/products', productsController.getProducts);
router.get('/products/:id', productsController.getProductById);
router.post('/products', checkAuth, productsController.createProduct);
router.delete('/products/:id', checkAuth, productsController.deleteProduct);
router.get('/products/user/:userId', productsController.getProductsByUser);

module.exports = router;
