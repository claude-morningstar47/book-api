const { User } = require("../database/sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Login Route
app.post("/login", async (req, res) => {
  // Get the user's login credentials from the request body
  const { username, password } = req.body;

  try {
    // Authenticate the user
    const user = await authenticateUser(username, password);

    // Set the user data in the session
    req.session.user = user;
    res.status(200).json({
      message: "User logged in successfully.",
    });
  } catch (err) {
    // If the user is not authenticated, send an error
    res.status(401).json({
      message: "Username or password is incorrect.",
    });
  }
});

app.post("/register", async (req, res) => {
  // Get the user's registration data from the request body
  const { username, password } = req.body;

  try {
    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const user = await createUser(username, hashedPassword);

    // Generate a JWT for the user
    const token = jwt.sign({ username }, process.env.JWT_SECRET);

    // Set the user data in the session
    req.session.user = user;
    res.status(200).json({
      message: "User registered successfully.",
      token,
    });
  } catch (err) {
    // If there is an error creating the user, send an error
    res.status(400).json({
      message: "Error creating user.",
    });
  }
});
