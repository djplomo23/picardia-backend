const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const Seller = require('../models/sellerModel');
const jwt = require('jsonwebtoken');
//const passport = require('passport');

//const Role = require('../models/Roles');
const { getToken, isAuth, isAdmin } = require('../util');
const Sesion = require('../models/sesionModel');
const FamiliaDescuento = require('../models/familiaDescuentoModel');
const IncentivoDescuento = require('../models/incentivoModel');
const ItbisDolar = require('../models/itbis&dolarModel');



const router = express.Router();

router.get("/", async (req, res) => {

  const sellers = await Seller.find({},{'password': 0});

  return res.send(sellers)

});

router.put(
  '/itbisdolar', 
  expressAsyncHandler(async (req, res) => {

    try {
    const {id, itbis, dolar, tarjetas} = req.body
  

   const itbisDolar = await  ItbisDolar.findById(id)
   

   if(itbisDolar){
      itbisDolar.itbis = Number(itbis),
      itbisDolar.dolar = Number(dolar),
      itbisDolar.tarjetas = Number(tarjetas)
    }

   
    const itbisDolarCreate = await itbisDolar.save()

   res.send({ message: 'Creada', itbisDolar: itbisDolarCreate });
  } catch (error) {
    
    res
    .status(400)
    .send({ message: error.message });
  }
   
  }) 
  
);

router.get("/itbisdolar", async (req, res) => {

  const itbisDolar = await ItbisDolar.find({});
  
  return res.send(itbisDolar)

});








router.post(
  '/familia', 
  expressAsyncHandler(async (req, res) => {

    try {
    const {familiaName, porciento} = req.body
   

    const familiaNew = new FamiliaDescuento({
      familiaName: familiaName,
      porciento: porciento
    })
    
    const familiaCreate = await familiaNew.save()

    res.send({ message: 'Familia Creada', familia: familiaCreate });
  } catch (error) {
    res
    .status(400)
    .send({ message: error.message });
  }
   
  }) 
  
);

router.get("/familialist", async (req, res) => {

  const familias = await FamiliaDescuento.find({}).sort({'porciento': 1});

  return res.send(familias)

});



router.post(
  '/incentivo', 
  expressAsyncHandler(async (req, res) => {

    try {
      
    const {incentivoName, _id, cuentasIncentivos, porciento, activo} = req.body

   

    const cuentasNew = new IncentivoDescuento({
      incentivoName: incentivoName,
      cuentas: cuentasIncentivos?.map(cuenta => {return { cuenta: cuenta._id, cuentaName: cuenta.name, porciento: cuenta.porciento, activo: cuenta.activo}}),
   
    })
    
    
    const cuentasCreate = await cuentasNew.save()

    res.send({ message: 'incentivo Creada', ceuntas: cuentasCreate });
  } catch (error) {
    res
    .status(400)
    .send({ message: error.message });
  }
   
  }) 
  
);

router.put(
  '/incentivo', 
  expressAsyncHandler(async (req, res) => {
    
   try {
    
    const incentivo = req.body

    const updateIncentivo = await IncentivoDescuento.findById(incentivo._id)
    
    for (let i = 0; i < updateIncentivo.cuentas.length; i++) {
      const element = updateIncentivo.cuentas[i];
      
     for (let index = 0; index < incentivo.cuentas.length; index++) {
       const el = incentivo.cuentas[index];

       if(element._id == el._id){
        

        element._id = el._id,
        element.cuenta = el.cuenta,
        element.cuentaName = el.cuentaName,
        element.porciento = el.porciento,
        element.activo = el.activo}
       
       
     }
      
     
      
    }
    
    const updatedIncentivo = await updateIncentivo.save()
    
    res.send({ message: 'Incentivo Actualizado', incentivo: updatedIncentivo });
   

  } catch (error) {
    res
    .status(400)
    .send({ message: error.message });
  }
   
  }) 
  
);



router.get("/incentivolist", async (req, res) => {

  const incentivos = await IncentivoDescuento.find({});

  return res.send(incentivos)

});

router.delete("/incentivo/delete/:id", async (req, res) => {

  try {

 
  const incentivo = await IncentivoDescuento.findById(req.params.id);

  if(incentivo){
    const incentivoDeleted = await incentivo.remove();
    res.send({ message: 'Incnetivo Deleted', incentivo: incentivoDeleted });
  }

  return res.send(incentivos)

    
  } catch (error) {
    res
    .status(400)
    .send({ message: error.message });
  }

});



module.exports = router;