const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profSchema = new Schema({
    prenom:{type: String, required: true},
    nom:{type: String, required: true},
})

module.exports = mongoose.model("Prof", profSchema);