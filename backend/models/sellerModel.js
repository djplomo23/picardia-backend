const {Schema, model} = require ('mongoose');
const bcrypt = require ( 'bcryptjs')


const sellerSchema = new Schema({
    userName: { type: String, required: true},
    name: { type: String, required: true},
    lastName: { type: String, required: true},
    email: {type: String, required: true, unique: true, index: true, dropDups: true},
    password: { type: String, required: true},
    isAdmin: { type: Boolean, default: false, required: true },
    isSeller: { type: Boolean, default: false, required: true },
    incentivo: { type: Schema.Types.ObjectId, ref: 'IncentivoDescuento', required: false},
},{
    timestamps: true,
    versionKey: false
});


sellerSchema.statics.encryptPassword = async (password) => {
   const salt = await bcrypt.genSalt(10)
   return await bcrypt.hash(password, salt)
}

sellerSchema.statics.comparePassword = async (password, receivedPassword) => {
   return await bcrypt.compare(password, receivedPassword)
}

 

module.exports = model('Seller', sellerSchema);