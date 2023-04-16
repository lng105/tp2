const { response } = require("express");
const { default: mongoose, mongo } = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const HttpErreur = require("../models/http-erreur");
const Prof = require("../models/prof");

const getProfById = async (requete, reponse, next) => {
    const profId = requete.params.profId;
    let prof;
    try {
        prof = await Prof.findById(profId);
    } catch (err) {
      return next(new HttpErreur("Erreur lors de la récupération du prof", 500));
    }
    if (!prof) {
      return next(new HttpErreur("Aucune prof trouvée pour l'id fourni", 404));
    }
    reponse.json({ prof: prof.toObject({ getters: true }) });
  };

  const creerProf = async (requete, reponse, next) => {
    const { nom, cours } = requete.body;
    const nouveauProf = new Prof({
      nom,
      cours:[],
    });
  
    try {
      await nouveauProf.save();
    } catch (err) {
      const erreur = new HttpErreur("Création de prof échouée", 500);
      return next(erreur);
    }
    reponse.status(201).json({ prof: nouveauProf.toObject({getters:true}) });
  };

  const supprimerProf = async (requete, reponse, next) => {
    const profId = requete.params.profId;
    let prof;
    try {
        prof = await Prof.findByIdAndRemove(profId);
    } catch {
      return next(
        new HttpErreur("Erreur lors de la suppression professeur", 500));
    }
    reponse.status(200).json({ message: "Professeur supprimée" });
  };

  const updateProf = async (requete, reponse, next) => {
    const { nom } = requete.body;
    const profId = requete.params.profId;
    let prof;
  
    try {
      prof = await Prof.findById(profId);
      prof.nom = nom;
      await prof.save();
    } catch {
      return next(new HttpErreur("Erreur lors de la mise à jour du prof", 500));
    }
    reponse.status(200).json({ prof: prof.toObject({ getters: true }) });
  };

  exports.getProfById = getProfById;
  exports.creerProf = creerProf;
  exports.supprimerProf = supprimerProf;
  exports.updateProf = updateProf;