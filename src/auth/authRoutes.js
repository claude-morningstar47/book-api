const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../database/sequelize");

const router = express.Router();
require("dotenv").config();

// Route pour l'enregistrement d'un nouvel utilisateur
router.post("/register", (req, res) => {
  const { userName, email, password, type } = req.body;

  // Vérifie si l'utilisateur existe déjà
  User.findOne({ where: { email: email } }).then((user) => {
    if (user) {
      res.status(409).json({ message: "Cet email est déjà utilisé." });
    } else {
      // Hash du mot de passe avec bcrypt
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) throw err;

        // Insertion de l'utilisateur dans la base de données
        User.create({ userName, email, password: hash, type })
          .then(() => {
            res
              .status(201)
              .json({ message: "Utilisateur enregistré avec succès." });
          })
          .catch((error) => {
            if (error) throw error;
          });
      });
    }
  });
});

// Route pour la connexion d'un utilisateur
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  // Vérifie si l'utilisateur existe
  User.findOne({ where: { email: email } }).then((user) => {
    if (!user) {
      res.status(401).json({ message: "Email incorrect." });
    } else {
      // Compare le mot de passe entré avec le hash stocké dans la base de données
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) throw err;

        if (result) {
          // Génère un token JWT pour l'utilisateur
          const token = jwt.sign({ userId: user.id }, process.env.API_KEY, {
            expiresIn: "8400s",
          });
          res
            .status(200)
            .json({ message: "Connecté avec succès", token, data: user });
        } else {
          res.status(401).json({ message: "Mot de passe incorrect." });
        }
      });
    }
  });
});

module.exports = router;
