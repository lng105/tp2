const express = require("express");
const controleursEtudiants = require("../controllers/etudiants-controleurs")
const router = express.Router();

router.get("/:etudiantId", controleursEtudiants.getEtudiantById);
router.post("/", controleursEtudiants.creerEtudiant);
router.delete("/:etudiantId", controleursEtudiants.supprimerEtudiant);
router.patch("/:etudiantId", controleursEtudiants.updateEtudiant);
router.patch("/inscription/:etudiantId", controleursEtudiants.inscription);


module.exports = router;