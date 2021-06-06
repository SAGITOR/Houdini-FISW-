const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new Schema({
    name: {type: String, required: true, trim: true, unique: true},
    email: {type: String, required: true, trim: true, unique: true},
    description: {type: String, trim: true},
    password: {type: String, required: true}
},{
    timestamps: true
});

adminSchema.methods.validatePassword = function (password) {
   return bcrypt.compare(password, this.password);
}
//HACER QUE NO SE ESCRIBAR MAS DE 1 ESPACIO SEGUIDO , GUARDAR ID TOQUEN DE API
module.exports = model('Admin', adminSchema);