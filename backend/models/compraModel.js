const {Schema, model} = require ('mongoose');

 
const compraSchema = new Schema({
    numCompra: { type: Number, required: true },
    fecha: { type: Date, required: true },
    metodoDepago: { type: String },
    proveedor: { type: String, },
    products: [{_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true}, countInStock: {type: Number}, name: {type: String}, moneda: {type: String}, priceVenta: {type: String}, priceCompra: {type: Number}} ],
    itbis: { type: Number, required: true },
    subTotal: { type: Number, default: 0, required: true },
    total: { type: Number, default: 0, required: true },
    gastos: {type: Number}
    
    
},{
    timestamps: true,
});
compraSchema.index({'$**': 'text'});

module.exports = model('Compra', compraSchema);