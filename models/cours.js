const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coursSchema = new Schema({
    titre:{type: String, required: true},
    description:{type: String, required: true}
})

module.exports = mongoose.model("Cours", coursSchema);