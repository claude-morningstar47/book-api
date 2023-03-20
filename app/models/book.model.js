module.exports = (sequelize, Sequelize) => {
  const Book = sequelize.define("books", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    published: {
      type: Sequelize.BOOLEAN,
    },
  });

  return Book;
};
