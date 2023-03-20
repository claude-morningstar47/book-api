const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../database/sequelize");
const auth = require("../auth/auth");

const router = express.Router();
require("dotenv").config();

// Route for registering a new user
router.post("/register", async (req, res) => {
  const { userName, email, password, type } = req.body;

  // Validate registration information
  if (!userName || !password || !email) {
    return res.status(400).json({
      message: "Please enter a valid username and password",
    });
  }

  // Check if user already exists
  const userExists = await User.findOne({ where: { email: email } });
  if (userExists) {
    return res.status(409).json({ message: "This email is already in use." });
  }

  // Hash password with bcrypt
  const hash = await bcrypt.hash(password, 10);

  // Insert user into database
  const user = await User.create({ userName, email, password: hash, type });

  // Generate JWT token for user
  const token = jwt.sign({ userId: user.id }, process.env.API_KEY, {
    expiresIn: "2h",
  });

  res.status(201).json({
    message: "User successfully registered.",
    token,
    user: {
      id: user.id,
      userName: user.userName,
      email: user.email,
      userType: user.userType,
    },
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
//  Find all User!
router.get("/users", auth, (req, res) => {
  User.findAll()
    .then((users) => {
      if (!users) {
        return res.status(404).json({ message: "Aucun utilisateur trouvé" });
      }
      return res.json({
        message: "La liste des utilisateurs a été bien récupérée",
        data: users,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message:
          "Une erreur est survenue lors de la récupération des utilisateurs",
        data: err,
      });
    });
});

// Find User by PK!
router.get("/users/:id", auth, (req, res) => {
  User.findByPk(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
      return res
        .status(200)
        .json({ message: "Utilisateur trouvé", data: user });
    })
    .catch((err) => {
      return res.status(500).json({
        message:
          "Une erreur est survenue lors de la récupération de l'utilisateur",
        err,
      });
    });
});

//  Update User!
router.patch("/users/:id", auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    const passwordIsValid = await bcrypt.compare(
      req.body.oldPassword,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).json({
        message: "L'ancien mot de passe n'est pas correct",
      });
    }
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashedPassword;
    }
    const updatedUser = await user.update(req.body);
    return res.json(updatedUser);
  } catch (err) {
    return res.status(500).json({
      message:
        "Une erreur est survenue lors de la mise à jour de l'utilisateur",
    });
  }
});

// Delete User!
router.delete("/users/:id", auth, (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deleted) => {
      if (!deleted) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
      return res
        .status(202)
        .json({ message: "Utilisateur supprimé avec succès" });
    })
    .catch((err) => {
      return res.status(500).json({
        message:
          "Une erreur est survenue lors de la suppression de l'utilisateur",
        data: err,
      });
    });
});

module.exports = router;
