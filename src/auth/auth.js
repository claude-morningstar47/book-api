// Import required packages
const jwt = require("jsonwebtoken");
require("dotenv").config();
// Middleware to check authorization header on incoming request
module.exports = (req, res, next) => {
  // Get authorization header from incoming request
  const authorizationHeader = req.headers.authorization;

  // If no authorization header is found, return 401
  if (!authorizationHeader) {
    return res.status(401).json({
      message:
        "Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en dans l'en-tête de la requête.",
    });
  }

  try {
    // Split and extract token from authorization header
    const [, token] = authorizationHeader.split(" ");
    // Decode token using built-in verify function
    const { userId } = jwt.verify(token, process.env.API_KEY);
    // Check if incoming request userId matches the one from decodedToken, else return 401
    if (req.body.userId && req.body.userId !== userId) {
      return res
        .status(401)
        .json({ message: "L'identifiant de l'utilisateur est invalide." });
    }
  } catch (error) {
    // Return 401 if error thrown while decoding token
    return res.status(401).json({
      message: "L'utilisateur n'est pas autorisé à accèder à cette resource.",
      data: error,
    });
  }
  // Proceed to next middleware or endpoint
  next();
};
