const express = require ('express');
const expressAsyncHandler = require ('express-async-handler');
const {isAdmin, isAuth, isSellerOrArmin} = require ('../util');
const Order = require('../models/orderModel');

 


const orderRouter = express.Router();
orderRouter.get(
  '/',
  isAuth,
 
  expressAsyncHandler(async (req, res) => {
    
    

    const orders = await Order.find({})
    res.send(orders);
  })
);


orderRouter.post('/', expressAsyncHandler(async(req, res) =>{
    if(req.body.orderItems.length === 0) {
        res.status(400).send({ message: 'Cart is empty'});
    }else {
        const order = new Order({
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            itbisPrice: req.body.itbisPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id,
        });
        const createdOrder = await order.save();
        res
            .status(201)
            .send({ message: 'New Order Created', order: createdOrder });
    }
}));

orderRouter.get(
  '/hoy',
  isAuth,
 
  expressAsyncHandler(async (req, res) => {
    const fechaInc = req.query.fechaInc
    const fechaFin = req.query.fechaFin


    const orders = await Order.find({$expr:{ $and: [
      {$eq: [{$year: "$createdAt"}, {$year: new Date(fechaInc)}]},
      {$eq: [{$month: "$createdAt"}, {$month: new Date(fechaInc)}]},
      {$gte: [{$dayOfMonth: "$createdAt"}, {$dayOfMonth: new Date(fechaInc)}]},
      {$lte: [{$dayOfMonth: "$createdAt"}, {$dayOfMonth: new Date(fechaFin)}]}
    ]} })
    res.send(orders);
  })
);



orderRouter.get(
  '/mes',
  isAuth,
 
  expressAsyncHandler(async (req, res) => {
    const fechaInc = req.query.fechaInc
    const fechaFin = req.query.fechaFin


    const orders = await Order.find({$expr:{ $and: [
      {$eq: [{$year: "$createdAt"}, {$year: new Date(fechaInc)}]},
      {$eq: [{$month: "$createdAt"}, {$month: new Date(fechaInc)}]},

    ]} })
    
    res.send(orders);
  })
);



orderRouter.get(
    '/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const order = await Order.findById(req.params.id);
      if (order) {
        res.send(order);
      } else {
        res.status(404).send({ message: 'Order Not Found' });
      }
    }) 
  );

  orderRouter.put(
    '/:id/pay',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const order = await Order.findById(req.params.id).populate(
        'user',
        'email name'
      );
      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          id: req.body.id,
          status: req.body.status,
          update_time: req.body.update_time,
          email_address: req.body.email_address,
        };
        const updatedOrder = await order.save();
        mailgun()
          .messages()
          .send(
            {
              from: 'Amazona <amazona@mg.yourdomain.com>',
              to: `${order.user.name} <${order.user.email}>`,
              subject: `New order ${order._id}`,
              html: payOrderEmailTemplate(order),
            },
            (error, body) => {
              if (error) {
                console.log(error);
              } else {
                console.log(body);
              }
            }
          );
        res.send({ message: 'Order Paid', order: updatedOrder });
      } else {
        res.status(404).send({ message: 'Order Not Found' });
      }
    })
  );

  orderRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const order = await Order.findById(req.params.id);
      if (order) {
        const deleteOrder = await order.remove();
        res.send({ message: 'Order Deleted', order: deleteOrder });
      } else {
        res.status(404).send({ message: 'Order Not Found' });
      }
    })
  );

  orderRouter.put(
    '/:id/deliver',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const order = await Order.findById(req.params.id);
      if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
  
        const updatedOrder = await order.save();
        res.send({ message: 'Order Delivered', order: updatedOrder });
      } else {
        res.status(404).send({ message: 'Order Not Found' });
      }
    })
  );
  

module.exports = (orderRouter);