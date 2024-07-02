const {Schema, model} = require('mongoose');

const tagSchema = new Schema({
   name: {type: [String], required: true},
}, {timestamps: true});

module.exports = model('tags', tagSchema);

