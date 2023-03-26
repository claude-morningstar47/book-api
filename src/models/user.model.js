module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.STRING(56),
      allowNull: false,
      // unique: {
      //   message: "Username is already taken.",
      // },
    },
    email: {
      type: Sequelize.STRING(56),
      allowNull: false,
      isEmail: true,
      unique: {
        message: "Email is already taken.",
      },
    },
    password: {
      type: Sequelize.STRING(64),
      allowNull: false,
    },
    role: {
      type: Sequelize.STRING(8),
      defaultValue: "user",
      allowNull: false,
      validate: {
        isIn: {
          args: [["admin", "user"]],
          message: "Role must be either 'admin' or 'user'",
        },
      },
    },
  });

  return User;
};
