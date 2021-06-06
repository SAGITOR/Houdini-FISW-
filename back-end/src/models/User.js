const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    name: {type: String, required: true, trim: true, unique: true},
    email: {type: String, required: true, trim: true, unique: true},
    password: {type: String, required: true}
},{
    timestamps: true
});

userSchema.methods.validatePassword = function (password) {
   return bcrypt.compare(password, this.password);
}
//HACER QUE NO SE ESCRIBAR MAS DE 1 ESPACIO SEGUIDO , GUARDAR ID TOQUEN DE API
module.exports = model('User', userSchema);