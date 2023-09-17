const express = require('express')


const router = express.Router()


const shopControllers = require('../controllers/shop')

router.get("/", shopControllers.getShop);
router.get('/products', shopControllers.getAllProducts)
// if You want some exact match you have to put it before dynamic route
router.get('/products/:productId', shopControllers.getProduct)
router.get('/cart', shopControllers.getCart)
router.post('/cart', shopControllers.postProductToCart)
router.post('/cart-delete', shopControllers.cartdeleteItem)

module.exports = router
