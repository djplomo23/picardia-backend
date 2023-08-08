const {Schema, model} = require ('mongoose');



const familiaDescuentoSchema = new Schema({
    familiaName: { type: String, required: true, unique: true},
    porciento: { type: Number, required: true},
  
},{
    versionKey: false
});



 

module.exports = model('FamiliaDescuento', familiaDescuentoSchema);