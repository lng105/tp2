const express = require("express");
const controleursProf = require("../controllers/prof-controleurs")
const router = express.Router();

router.get("/:profId", controleursProf.getProfById);
router.post("/", controleursProf.creerProf);
router.delete("/:profId", controleursProf.supprimerProf)
router.patch("/:profId", controleursProf.updateProf)

module.exports = router;