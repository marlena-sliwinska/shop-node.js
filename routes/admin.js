const express = require("express");

const adminControllers = require('../controllers/admin')

const router = express.Router();

router.get("/add-product", adminControllers.getAddProduct);
router.get("/edit-product/:productId", adminControllers.getEditProduct);
router.post("/add-product", adminControllers.postAddProduct);
router.post("/edit-product", adminControllers.postEditProduct);
router.post("/delete-product", adminControllers.deleteProduct);
router.get('/products',adminControllers.getAllProducts)



module.exports = router