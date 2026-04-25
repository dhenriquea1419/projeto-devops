const router = require('express').Router();

const productsController = require('../controllers/products');
const salesController = require('../controllers/sales');
const usersController = require('../controllers/users');


router.get('/products', productsController.index); 
router.post('/products', productsController.create); 


router.get('/sales', salesController.index);
router.post('/sales', salesController.create); 


router.get('/users', usersController.index); 
router.post('/users', usersController.create); 

module.exports = router;