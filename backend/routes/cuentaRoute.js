const express = require ('express');
const Cuenta = require('../models/cuentasModel');


//const {verifyToken, isAdmin, isAffiliate} = require('../middlewares/index')


const router = express.Router();
router.get("/",  async(req, res) =>{
    const cuentas = await Cuenta.find({});
    
    
    return res.send(cuentas)
    
    })


router.post("/createcuentas", async(req, res) =>{
    const cuentas = new Cuenta({
      name: req.body.name,
      cuenta: req.body.cuenta,
      
    });
    const newCuenta = await cuentas.save();
    if(newCuenta){
       return res.status(201).send({ message: "Nueva cuenta creada", data: newCuenta});
    }
    return res.status(500).send({message: 'Error al intentar crear la cuenta.'});
})

router.put("/updated", async (req, res) =>{

    const {name, cuenta, _id} = req.body;
  
    const cuentaEdit = await Cuenta.findById(_id);
   
    if(cuentaEdit){
    
        cuentaEdit.name = name;
        cuentaEdit.cuenta = cuenta;

  
    const updatedCuenta = await cuentaEdit.save(cuentaEdit);
    if(updatedCuenta){
       return res.status(200).send({ message: "New Cuenta Updated", data: updatedCuenta});
    }
    
}
    return res.status(500).send({message: 'Error in Updating Cuenta.'});

});

router.delete('/:id',  async (req, res) => {
    const deletedCuenta = await Cuenta.findById(req.params.id);
    if(deletedCuenta){
        await deletedCuenta.remove();
        res.send({message: "Cuenta Eliminada"});
    }else{
    res.send("Error al intentar Eliminar la Cuenta")
    }
}); 
   
 
module.exports = router;