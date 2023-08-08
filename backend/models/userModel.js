const {Schema, model} = require ('mongoose');
const bcrypt = require ( 'bcryptjs')


const userSchema = new Schema({
    userName: { type: String, required: true, unique: true, },
    name: { type: String, },
    lastName:{ type: String, },
    email: {type: String, required: true, unique: true, index: true, dropDups: true},
    password: { type: String, required: true},
    phone: {type: String,},
    codigo: {type: String, },
    roles: [{
        ref: "Role",
        type: Schema.Types.ObjectId
    }]
},{ 
    timestamps: true,
    versionKey: false
});


userSchema.statics.encryptPassword = async (password) => {
   const salt = await bcrypt.genSalt(10)
   return await bcrypt.hash(password, salt)
}

userSchema.statics.comparePassword = async (password, receivedPassword) => {
   return await bcrypt.compare(password, receivedPassword)
}



module.exports = model('User', userSchema);