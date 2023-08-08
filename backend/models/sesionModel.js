const {Schema, model} = require ('mongoose');

 

const SesionSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    inicioDeSesion: { type: Date, },
    cierreDeSesion: {type: Date, },
    
   
},{
    versionKey: false
});




const Sesion = model('Sesion', SesionSchema);

module.exports = Sesion;