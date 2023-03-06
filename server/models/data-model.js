const {Schema, model} = require('mongoose');

const DataSchema = new Schema({
    uniq_id: {type: String, required: true},
    longitude: {type: String, required: true},
    latitude: {type: String, required: true},
    temperature: {type: String, required: true},
    date: {type: String, required: true}
})

module.exports = model('Data', DataSchema);
