const  { Schema, model} = require ('mongoose')

//export const ROLES = ["user", "admin", "affiliate"]

const roleSchema = new Schema({
    name: String
},{
    versionKey: false
}); 

module.exports = model("Role", roleSchema);