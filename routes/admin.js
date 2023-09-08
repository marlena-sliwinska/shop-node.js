const express = require("express");

const adminControllers = require('../controllers/admin')

const router = express.Router();

router.get("/add-product", adminControllers.getAddProduct);
router.post("/add-product", adminControllers.postAddProduct);
router.get('/products',adminControllers.getAllProducts)



module.exports = router