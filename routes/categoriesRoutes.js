const express = require('express');
const router = express.Router();

const categoriesController = require('../controllers/categoriesController');
const checkAuth = require('../middlewares/checkAuth');
const checkAdmin = require('../middlewares/checkAdmin');

router.get('/categories', categoriesController.getCategories);
router.get('/categories/:id', categoriesController.getCategoryById);
router.post('/categories', checkAuth, checkAdmin, categoriesController.createCategory);
router.put('/categories/:id', checkAuth, checkAdmin, categoriesController.updateCategory);
router.delete('/categories/:id', checkAuth, checkAdmin, categoriesController.deleteCategory);

module.exports = router;
