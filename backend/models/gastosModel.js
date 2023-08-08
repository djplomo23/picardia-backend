const {Schema, model, Date} = require ('mongoose');



const gastosSchema = new Schema({
    
    gastos: [{
        fecha: {type: Date},
        gasto: { type: String, required: true},
        costo: { type: Number, },
        }
        ]
  
},{
    versionKey: false,
    timestamps: true,
});



 

module.exports = model('Gastos', gastosSchema);