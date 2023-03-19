const validTypes = ["admin", "user"];

module.exports = (Sequelize, DataTypes) => {
  return Sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: DataTypes.STRING,
      required: true,
      unique: {
        message: "Username is already taken.",
      },
    },
    email: {
      type: DataTypes.STRING,
      required: true,
      unique: {
        message: "Email is already taken.",
      },
    },
    password: {
      type: DataTypes.STRING,
      required: true,
    },
    userType: {
      type: DataTypes.ENUM(validTypes),
      values: ["admin", "user"],
      defaultValue: "user",
      validate: {
        isTypeValid(value) {
          if (!value) {
            throw new Error("User must have at least one type.");
          }
          const types = value.split(",");
          types.forEach((type) => {
            if (!validTypes.includes(type)) {
              throw new Error(
                `User type must be one of the following: ${validTypes}`
              );
            }
          });
        },
      },
    },
  });
};
