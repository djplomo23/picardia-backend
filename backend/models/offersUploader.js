const {Schema, model} = require ('mongoose');
 

const offersSchema = new Schema({
    name: { type: String,  },
    image: { type: String, required: true },
    tittle: { type: String, },    
});

module.exports = model('Offers', offersSchema);