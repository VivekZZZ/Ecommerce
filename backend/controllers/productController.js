
const Product = require('../models/product')

const ErrorHandler = require('../utils/errorHandler')

const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

const APIFeatures = require('../utils/apiFeatures')

//create new product => /api/v1/product/new

exports.newProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product

    })
})


// get all products => /api/v1/products?keyword=apple

exports.getProducts = catchAsyncErrors(async (req, res, next) => {

    const resPerPage = 4;
    const productCount = await Product.countDocuments();

    const apiFeatures = new APIFeatures(Product.find(), req.query )

    .filter()
    .pagination(resPerPage)

    const products = await apiFeatures.query;

    res.status(200).json({
        success: true,
        productCount,
        resPerPage,
        products
    })
})

// get single product details => /api/v1/product/:id

exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if(!product) {
        return next(new ErrorHandler('Product not found', 404));
    }


    res.status(200).json({
        success: true,
        product
    })

})

// delete product => /api/v1/admin/prodduct/:id

exports.deleteProduct = catchAsyncErrors(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if(!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        })
    }

    await product.deleteOne();

    res.status(200).json({
        success: true,
        message: 'Product is deleted'
    })
})