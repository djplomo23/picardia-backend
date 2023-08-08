const {Schema, model, Date} = require ('mongoose');



const itbisDolarSchema = new Schema({
    
    itbis: {type: Number},
    dolar: {type: Number},
    tarjetas: {type: Number}
  
},{
    versionKey: false,
    timestamps: true,
});



 

module.exports = model('ItbisDolar', itbisDolarSchema);