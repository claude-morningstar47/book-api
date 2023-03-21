const auth = require("../config/auth.config");
const db = require("../models");
const User = db.user;

// FindAll Users
exports.findAll = async (req, res) => {
  try {
    const users = await User.findAll();
    if (!users) {
      return res.status(404).json({ message: "Aucun utilisateur trouvé" });
    }
    return res.json({
      message: "La liste des utilisateurs a été bien récupérée",
      data: users,
    });
  } catch (err) {
    return res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération des utilisateurs",
      data: err,
    });
  }
};

// findUserByPK
exports.findByPk = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    return res.status(200).json({ message: "Utilisateur trouvé", data: user });
  } catch (err) {
    return res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération de l'utilisateur",
      err,
    });
  }
};

//  Update User!
(exports.patch = auth),
  async (req, res) => {
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
  };

// Delete User!
(exports.delete = auth),
  async (req, res) => {
    try {
      const deleted = await User.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!deleted) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
      return res
        .status(202)
        .json({ message: "Utilisateur supprimé avec succès" });
    } catch (err) {
      return res.status(500).json({
        message:
          "Une erreur est survenue lors de la suppression de l'utilisateur",
        data: err,
      });
    }
  };
