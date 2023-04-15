const express = require("express");
const controleursCours = require("../controllers/cours-controleurs")
const router = express.Router();

router.get("/:coursId", controleursCours.getCoursById);
/*
router.post("/", controleursCours.creerCours);
router.patch("/", controleursCours.updateCours);
router.delete("/", controleursCours.supprimerCours);
*/
module.exports = router;



