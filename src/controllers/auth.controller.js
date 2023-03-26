const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config.env" });

const User = db.user;
const Op = db.Sequelize.Op;

// Register User
exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    // Validate registration information
    if (!username || !password || !email) {
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
    const user = await User.create({ username, email, password: hash, role });

    // Generate JWT token for user
    const token = jwt.sign({ userId: user.id }, process.env.API_KEY, {
      expiresIn: "2h",
    });

    const userData = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    res.status(201).json({
      message: "User successfully registered.",
      token,
      user: userData,
    });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      res
        .status(400)
        .json({ message: "Role must be either 'admin' or 'user'" });
    } else {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  if ((req.body == !email, !password)) {
    return res
      .status(401)
      .json({ message: "format incorrect ex: email et password." });
  } else {
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
  }
};
