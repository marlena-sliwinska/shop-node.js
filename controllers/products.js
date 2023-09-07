const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add new product',
        path: '/add-product'
    })
}

exports.postAddProduct = (req,res, next)=> {
    const product = new Product(req.body.name)
    product.save()
    res.redirect('/')
}

exports.getAllProducts = (req, res, next) => {
    Product.fetchAll(products=>{
        res.render('shop/products-list',{pageTitle: 'Products', path: '/', products})    
    })
       
}