const {Schema, model} = require('mongoose');

const DataSchema = new Schema({
    name: {type: String, required: true},
    age: {type: String, required: true},
})

module.exports = model('Data', DataSchema);
