const express = require('express')


const router = express.Router()


const shopControllers = require('../controllers/shop')

router.get("/", shopControllers.getShop);
router.get('/products', shopControllers.getAllProducts)
router.get('/cart', shopControllers.getCart)

module.exports = router
