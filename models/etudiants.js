const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const etudiantSchema = new Schema({
    nom:{type: String, required: true},
    numCours:[{type: mongoose.Types.ObjectId, required: true, ref:"Cours"}]
})

module.exports = mongoose.model("Etudiant", etudiantSchema);