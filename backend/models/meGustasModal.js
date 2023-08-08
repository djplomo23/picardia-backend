const { Schema, model } = require('mongoose');



const meGustaSchema = new Schema(

    

        {
            productId: { type: Schema.Types.ObjectId, ref: 'Product', unique: true  },
            meGustas: [{
                userId: { type: Schema.Types.ObjectId, ref: 'User', },
                meGustas: { type: Number, },
            }]
        }
   
, {
    versionKey: false,
    timestamps: true,
});





module.exports = model('MeGustas', meGustaSchema);