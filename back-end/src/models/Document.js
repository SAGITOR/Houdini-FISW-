const { Schema, model } = require('mongoose');

const documentSchema = new Schema({
    userID: {type: Schema.Types.ObjectId, required: true, trim: true,  unique: false},
    title: {type: String, required: true, trim: true, unique: false},
    content: {type: String, required: true, trim: true,  unique: false},
},{
    timestamps: true
});

//HACER QUE NO SE ESCRIBAR MAS DE 1 ESPACIO SEGUIDO , GUARDAR ID TOQUEN DE API
module.exports = model('Document', documentSchema);