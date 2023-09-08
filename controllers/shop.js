const Product = require('../models/product')


exports.getAllProducts = (req, res, next) => {
    Product.fetchAll(products=>{
        res.render('shop/products-list',{pageTitle: 'Products', path: '/products', products})    
    })
}

exports.getShop = (req, res, next) => {
    Product.fetchAll(products=>{
        res.render('shop/index',{pageTitle: 'Shop', path: '/', products: products.slice(0,3)})    
    })  
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {pageTitle: 'Cart', path: '/cart'})
}