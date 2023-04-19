const { response } = require("express");
const { default: mongoose, mongo } = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const HttpErreur = require("../models/http-erreur");
const Etudiant = require("../models/etudiants");
const Cours = require("../models/cours");

const getEtudiantById = async (requete, reponse, next) => {
    const etudiantId = requete.params.etudiantId;
    let etudiant;
    try {
        etudiant = await Etudiant.findById(etudiantId);
    } catch (err) {
      return next(new HttpErreur("Erreur lors de la récupération de l'etudiant", 500));
    }
    if (!etudiant) {
      return next(new HttpErreur("Aucune etudiant trouvée pour l'id fourni", 404));
    }
    reponse.json({ etudiant: etudiant.toObject({ getters: true }) });
  };

  const creerEtudiant = async (requete, reponse, next) => {
    const { nom } = requete.body;
    const nouveauEtudiant = new Etudiant({
      nom,
      listeCours:[],
    });
  
    try {
      await nouveauEtudiant.save();
    } catch (err) {
      const erreur = new HttpErreur("Création de l'etudiant échouée", 500);
      return next(erreur);
    }
    reponse.status(201).json({ etudiant: nouveauEtudiant.toObject({getters:true}) });
  };

  const supprimerEtudiant = async (requete, reponse, next) => {
    const etudiantId = requete.params.etudiantId;
    let etudiant;
    try {
        etudiant = await Etudiant.findByIdAndRemove(etudiantId);
    } catch {
      return next(
        new HttpErreur("Erreur lors de la suppression de l'etudiant", 500));
    }
    reponse.status(200).json({ message: "Etudiant supprimée" });
  };

  const updateEtudiant = async (requete, reponse, next) => {
    const { nom } = requete.body;
    const etudiantId = requete.params.etudiantId;
    let etudiant;
  
    try {
      etudiant = await Etudiant.findById(etudiantId);
      etudiant.nom = nom;
      await etudiant.save();
    } catch {
      return next(new HttpErreur("Erreur lors de la mise à jour d'etudiant", 500));
    }
    reponse.status(200).json({ etudiant: etudiant.toObject({ getters: true }) });
  };

  const inscription = async (requete, reponse, next) => {
    const { listeCours } = requete.body;
    const etudiantId = requete.params.etudiantId
    const coursId = requete.params.coursId
    let etudiant, cours;

    try {
      cours = await Cours.findById(coursId);
      etudiant = await Etudiant.findById(etudiantId);
      etudiant.listeCours = listeCours;
      await etudiant.save();
      cours.listeEtudiants.push(etudiant.uuidv4)
      await cours.save()
    } catch {
      return next(new HttpErreur("Erreur lors de l'ajout du cours'", 500));
    }
    reponse.status(200).json({ message: "Cours ajouter" });
  };

  exports.getEtudiantById = getEtudiantById;
  exports.creerEtudiant = creerEtudiant;
  exports.supprimerEtudiant = supprimerEtudiant;
  exports.updateEtudiant = updateEtudiant;
  exports.inscription = inscription