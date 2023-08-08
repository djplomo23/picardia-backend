const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const Product = require('../models/productModel');
const User = require('../models/userModel')
const { isAdmin, isSellerOrAdmin, isAuth, isSeller } = require('../util');
const codigoDeBarra = require('../helpers/codigoDeBarra')
const MeGustas = require('../models/meGustasModal')





const router = express.Router();

router.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const pageSize = Number(req.query.pageSize) || 40;
    const page = Number(req.query.pageNumber) || 1;
    const name = req.query.name || '';
    const codigo = Number(req.query.name) || '';
    const category = req.query.category || '';
    const order = req.query.order || '';
    const min = req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max = req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const rating =
      req.query.rating && Number(req.query.rating) !== 0
        ? Number(req.query.rating)
        : 0;

    const nameFilter = name && !codigo && typeof name == 'string' ? { name: { $regex: name, $options: 'i' } } : name && codigo && typeof codigo == 'number' ? { codigo } : {};
    //const codigoFilter = codigo ? { codigo } : {};
    const categoryFilter = category ? { category } : {};
    const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
    const ratingFilter = rating ? { rating: { $gte: rating } } : {};
    const sortOrder =
      order === 'lowest'
        ? { price: 1 }
        : order === 'highest'
          ? { price: -1 }
          : order === 'toprated'
            ? { rating: -1 }
            : { _id: -1 };
    const count = await Product.countDocuments({
      ...nameFilter,
      //...codigoFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    });
    const totalCount = await Product.countDocuments({ });
    const products = await Product.find({
      ...nameFilter,
      // ...codigoFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .sort({"name": 1})
      .skip(pageSize * (page - 1))
      .limit(pageSize)

      
    res.send({ products, count, page, pages: Math.ceil(count / pageSize) });
  })
);

router.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct('category');
    res.send(categories);
  })
);

router.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct('category');
    res.send(categories);
  })
);




router.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);


router.post(
  '/',
  isAuth,

  expressAsyncHandler(async (req, res) => {

    const codigo = codigoDeBarra()

    try {
      const { name, image, brand, category, description, price, countInStock, familiaDescuento, isCuadre } = req.body

      const product = new Product({
        name,
        images: image.map((img) => { return { name: img.name, public_id: img.public_id, url: img.url } }),
        price,
        category,
        familiaDescuento,
        brand,
        countInStock,
        description,
        numReviews: 0,
        codigo,
        isCuadre,
      });

      const createdProduct = await product.save();

      res.send({ message: 'Product Created', product: createdProduct });
    } catch (error) {
      res
        .status(400)
        .send({ message: error.message });
    }



  })
);

router.put(
  '/megusta/:id',
  isAuth,

  expressAsyncHandler(async (req, res) => {
    try {
      // console.log(req.body)

      const { userId, idMegustas } = req.body
      const productId = req.params.id;
      console.log(userId)
      //console.log(productId)
      const producto = await MeGustas.find({ productId })
      console.log(!!producto)
      
      if(!producto){
        const product = await Product.findById(productId )
        console.log('nuevo')
        const megusta = new MeGustas({
          productId: product._id,
        meGustas:{ 
          userId,
          meGustas: 1
  
        }
        
      })
    
      const newMegusta = await megusta.save()  
      console.log(newMegusta)
      }

      
      if (producto) {

        const idd = producto.map(pro => pro._id)
        const product = await MeGustas.findById(idd.toString())
        const idUser = product.meGustas.map(id => id.userId)

        

        if (idUser.toString() == userId) {
         // console.log(product)
        
           
         product.productId = product.productId,
            product.meGustas = product.meGustas.map(use => {
              if (use.userId == userId && use.meGustas == 0) {
                    {userId,
                   use.meGustas = 1}
                 
                

              }
            }
            )

            console.log(product.meGustas)
           //const meGustaSave = await product.save()

         /* console.log( product.productId = product.productId,
            product.meGustas = product.meGustas.map(use => {
              switch (use.userId == userId) {
                case use.meGustas == 0:
                   return meGustas = 1
                  break;
                case use.meGustas == 1:
                  return meGustas = 0
                  break;

              }
            }
            ))*/

        }else if(idUser.toString() !== userId ){
          console.log('hola')
          product.productId = product.productId,
          product.meGustas.push({
            userId: userId, 
            meGustas: 1
          })
          console.log(product)
          
        }
      } 
      
      






      //const newMegusta = await producto.save()  



      /* let trueOrFalse = []
       for(let i = 0; i < producto.meGustas.length; i++ ) {
         const el = producto.meGustas[i]
        //console.log(el.userId == userId)
        trueOrFalse.push(el.userId == userId)
        //console.log(userId)
        //console.log(el.userId)
        //return el.userId == userId
       }*/
      // console.log(producto)

      /*if(product){
        
        const megusta = new MeGustas({
          productId: product._id,
        meGustas:{ 
          userId,
          meGustas: 25
  
        }
        
      })
    
      const newMegusta = await megusta.save()  
      console.log(newMegusta)
    }*/


      if (megusta == productId) {
        const product = await MeGustas.updateOne({ _id: productId }, { $addToSet: { meGustas: { userId: userId, meGustas: 1 } } });


        //  console.log(trueOrFalse)
        //console.log(trueOrFalse.includes(true))
        //console.log(product)



        //const updatedProduct = await product.save();
        //console.log(updatedProduct)

        res.send({ message: 'Me Gusta', });
      } else {
        const product = await Product.findById({ _id: productId }).meGustas.findById({ _id: userId })
        const productoEliminado = await product;
        //const productEliminado = await product.revome()
        console.log(product)
        console.log(productoEliminado)
        res.status(404).send({ productoEliminado, message: 'Me Gusta Eliminado' });
      }
    } catch (error) {
      res
        .status(400)
        .send({ message: error.message });
    }
  })
);

router.put(
  '/:id',
  isAuth,

  expressAsyncHandler(async (req, res) => {
    try {

      const productId = req.params.id;
      const product = await Product.findById(productId);

      if (product) {
        product.name = req.body.name;
        product.images = req.body.image
        product.price = req.body.price;
        product.category = req.body.category;
        product.familiaDescuento = req.body.familiaDescuento;
        product.brand = req.body.brand;
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;
        product.isCuadre = req.body.isCuadre;

        const updatedProduct = await product.save();

        res.send({ message: 'Product Updated', product: updatedProduct });
      } else {
        res.status(404).send({ message: 'Product Not Found' });
      }
    } catch (error) {
      res
        .status(400)
        .send({ message: error.message });
    }
  })
);

router.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id);
    if (product) {

      const deleteProduct = await product.remove();
      res.send({ message: 'Product Deleted', product: deleteProduct });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

router.post(
  '/:id/reviews',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      if (product.reviews.find((x) => x.name === req.user.name)) {
        return res
          .status(400)
          .send({ message: 'You already submitted a review' });
      }
      const review = {
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length;
      const updatedProduct = await product.save();
      res.status(201).send({
        message: 'Review Created',
        review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);


module.exports = router;