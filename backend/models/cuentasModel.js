const {Schema, model} = require ('mongoose');

 

const CuentasSchema = new Schema({
    
    name: { type: String, },
    cuenta: {type: Number, },
    
   
},{
    versionKey: false
});




const Cuenta = model('Cuenta', CuentasSchema);

module.exports = Cuenta;