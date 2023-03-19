// Inclure le module jsonwebtoken
const jwt = require("jsonwebtoken");

// Importer la clé API
require("dotenv").config();

// Créer une route pour l'enregistrement et la connexion
module.exports = (req, res, next) => {
  // Récupérer l'en-tête d'autorisation
  const authorizationHeader = req.headers.authorization;

  // Vérifier si l'en-tête d'autorisation est présente
  if (!authorizationHeader) {
    return res.status(401).json({
      msg: "Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en dans l'en-tête de la requête.",
    });
  }

  // Essayer de décoder le jeton
  try {
    // Récupérer le jeton à partir de l'en-tête et le décoder
    const token = authorizationHeader && authorizationHeader.split(" ")[1];
    const decoderToken = jwt.verify(token, API_KEY);
    const userId = decoderToken.userId;

    // Vérifier si l'identifiant de l'utilisateur est valide
    if (req.body.userId && req.body.userId !== userId) {
      return res
        .status(401)
        .json({ msg: "L'identifiant de l'utilisateur est invalide." });
    }
  } catch (error) {
    // Retourner une erreur si l'utilisateur n'est pas autorisé
    return res.status(401).json({
      msg: "L'utilisateur n'est pas autorisé à accèder à cette resource.",
      data: error,
    });
  }
  next();
};
