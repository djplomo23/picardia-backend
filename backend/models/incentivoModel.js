const {Schema, model} = require ('mongoose');



const incentivoDescuentoSchema = new Schema({
    incentivoName: {type: String},
    cuentas: [{
        cuenta: { type: Schema.Types.ObjectId, ref: 'Cuenta', required: true},
        cuentaName: { type: String, required: true},
        porciento: { type: Number, },
        activo: {type: Boolean, }}
        ]
  
},{
    versionKey: false
});



 

module.exports = model('IncentivoDescuento', incentivoDescuentoSchema);