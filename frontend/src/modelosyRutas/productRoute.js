const express = require ('express');
const Product = require ('../models/productModel');
const { isAdmin, isAuth } = require('../util');


const router = express.Router();


router.get("/", async(req, res) =>{
const products = await Product.find({});
return res.send(products)

})


router.get('/:id', async (req, res) => {
    const product = await Product.findOne({ _id: req.params.id });
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product Not Found.' });
    }
  });



router.post("/", isAuth, isAdmin, async(req, res) =>{
    const product = new Product({
    name: req.body.name,
    image: req.body.image,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    description: req.body.description,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    });
    const newProduct = await product.save();
    if(newProduct){
       return res.status(201).send({ message: "New Product Created", data: newProduct});
    }
    return res.status(500).send({message: 'Error in Create Product.'});
})

router.put("/:id", isAuth, isAdmin, async (req, res) =>{
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if(product){
    
    product.name = req.body.name;
    product.image = req.body.image;
    product.brand = req.body.brand;
    product.price = req.body.price;
    product.category = req.body.category;
    product.countInStock = req.body.countInStock;
    product.description = req.body.description;    
    const updatedProduct = await product.save(product);
    if(updatedProduct){
       return res.status(200).send({ message: "New Product Updated", data: updatedProduct});
    }
    
}
    return res.status(500).send({message: 'Error in Updating Product.'});

});

router.delete('/:id', isAuth, isAdmin,  async (req, res) => {
    const deletedProdutc = await Product.findById(req.params.id);
    if(deletedProdutc){
        await deletedProdutc.remove();
        res.send({message: "product Deleted"});
    }else{
    res.send("Error in Deletion")
    }
});
   

module.exports = router;