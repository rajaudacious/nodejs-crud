const { Mongoose } = require("mongoose");
const Product = require("../model/Product");

// Get all product
const productAll = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.json({ message: error });
    }
};
// Single product
const productDetails = async (req, res) => {
    try{
        const product = await Product.findById(req.params.productId);
        res.json(product);
    } catch (error) {
        res.json({ message: error });
    }
};

// Add new product
const productCreate = async (req, res) => {
    const product = new Product({
        title: req.body.title,
        price: req.body.price,
        image: req.body.image,
        details: req.body.details
    });
    console.log(product);

    try{
        const savedProduct = await product.save();
        console.log(savedProduct);
        res.send(savedProduct);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Update product
const productUpdate = async (req, res) => {
    try {
        const product = {
            title: req.body.title,
            price: req.body.price,
            image: req.body.image,
            details: req.body.details
        };

        const updatedProduct = await Product.findByIdAndUpdate(
            { _id: req.params.productId },
            product 
        );
        res.json(updatedProduct);
    } catch (error) {
        res.json({ message: error });
    }
};

// Delete product
const productDelete = async (req, res) => {
    try {
     const {productId} = req.params
     const data = await Product.deleteOne({_id:productId})
     return res.status(200).json(data);
    } catch (error) {
        res.json({ message: error });
    }
};

module.exports = {
    productAll,
    productDetails,
    productCreate,
    productUpdate,
    productDelete
}

