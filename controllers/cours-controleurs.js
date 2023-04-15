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
      return next(
        new HttpErreur("Erreur lors de la récupération du cours", 500)
      );
    }
    if (!cours) {
      return next(new HttpErreur("Aucune cours trouvée pour l'id fourni", 404));
    }
    reponse.json({ cours: cours.toObject({ getters: true }) });
  };

  exports.getCoursById = getCoursById;