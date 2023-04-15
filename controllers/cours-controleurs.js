const { response } = require("express");
const { default: mongoose, mongo } = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const HttpErreur = require("../models/http-erreur");

const Cours = require("../models/cours");

const getCoursById = async (requete, reponse, next) => {
  const coursId = requete.params.coursId;
  let cours;
  try {
    cours = await Cours.findById(coursId);
  } catch (err) {
    return next(new HttpErreur("Erreur lors de la récupération du cours", 500));
  }
  if (!cours) {
    return next(new HttpErreur("Aucune cours trouvée pour l'id fourni", 404));
  }
  reponse.json({ cours: cours.toObject({ getters: true }) });
};

const creerCours = async (requete, reponse, next) => {
  const { titre, description, createur } = requete.body;
  const nouvelleCours = new Cours({
    titre,
    description,
  });

  try {
    await nouvelleCours.save();
  } catch (err) {
    const erreur = new HttpErreur("Création de place échouée", 500);
    return next(erreur);
  }

  reponse.status(201).json({ cours: nouvelleCours });
};

const supprimerCours = async (requete, reponse, next) => {
  const coursId = requete.params.coursId;
  let cours;
  try {
    cours = await Cours.findByIdAndRemove(coursId);
  } catch {
    return next(
      new HttpErreur("Erreur lors de la suppression de la Cours", 500)
    );
  }

  reponse.status(200).json({ message: "Cours supprimée" });
};

const updateCours = async (requete, reponse, next) => {
  const { titre, description } = requete.body;
  const coursId = requete.params.coursId;
  let cours;

  try {
    cours = await Cours.findById(coursId);
    cours.titre = titre;
    cours.description = description;
    await cours.save();
  } catch {
    return next(
      new HttpErreur("Erreur lors de la mise à jour du cours", 500)
    );
  }

  reponse.status(200).json({ cours: cours.toObject({ getters: true }) });
};

exports.getCoursById = getCoursById;
exports.creerCours = creerCours;
exports.supprimerCours = supprimerCours;
exports.updateCours = updateCours;
