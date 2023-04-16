const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coursSchema = new Schema({
    titre:{type: String, required: true},
    description:{type: String, required: true},
    professeur:{type: mongoose.Types.ObjectId, required: true, ref:"Prof"},
})

module.exports = mongoose.model("Cours", coursSchema);