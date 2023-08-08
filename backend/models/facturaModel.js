const {Schema, model} = require ('mongoose');

 
const facturaSchema = new Schema({
    numFactura: { type: Number, required: true },
    NCF: { type: String, required: true },
    RNC: { type: Number, required: true },
    RNCName: { type: String, required: true },
    Vendedor: { type: Schema.Types.ObjectId, ref: 'Seller', required: true},
    fecha: { type: Date, required: true },
    metodoDepago: { type: String, required: true },
    cuentaCliente: { type: String, },
    items: [{_id: { type: Schema.Types.ObjectId, ref: 'Product'} , cantidad: {type: Number}, nameProduct: {type: String}, isCuadre: {type: Boolean} ,  moneda: {type: String}, itemValor: {type: Number}} ],
    itbis: { type: Number },
    subTotal: { type: Number, default: 0, required: true },
    total: { type: Number, default: 0, required: true },
    totalDolar: { type: Number, default: 0},
    isDolar: {type: Boolean},
    isDiscount: {type: Boolean}, 
    comision: {_id: { type: Schema.Types.ObjectId, ref: 'Seller'}, valorComision: {type: Number}, message: {type: String}}
    
    
});
facturaSchema.index({'$**': 'text'});

module.exports = model('Factura', facturaSchema);