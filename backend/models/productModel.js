const { strict } = require('assert');
const { Schema, model } = require('mongoose');

const reviewSchema = new Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

/*const meGustaSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', unique: true},
    meGustas: { type: Number, },
  
  },
  {
    timestamps: true,
  }
);*/

const imageSchema = new Schema(
  {
    name: { type: String },
    public_id: { type: String, },
    url: { type: String },

  },
  {
    timestamps: true,
  }
);
const productSchema = new Schema(
  {
    name: { type: String, required: true, },
    images: [{
      name: { type: String },
      public_id: { type: String, },
      url: { type: String },
    }],
    ofertas: { type: String },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    familiaDescuento: { type: Schema.Types.ObjectId, ref: 'FamiliaDescuento', required: false},
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number },
    numReviews: { type: Number },
    reviews: [reviewSchema],
    
    codigo: { type: Number, required: true, unique: true },
    isVisible: {type: Boolean, default: true},
    isCuadre: {type: Boolean, default: false}
  },
  {
    timestamps: true,
  }
);

module.exports = model('Product', productSchema);