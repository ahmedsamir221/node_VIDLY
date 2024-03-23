const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("nodejs", "nodejsApp", "123456", {
  host: "localhost",
  dialect: "mssql",
});

(async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

const Genre = sequelize.define(
  "genre",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
  },
  { timestamps: false }
);

// (async function creategenre() {
//   try {
//     const genre = await Genre.create({ name: "comedy" });
//     console.log("genre: ", genre);
//   } catch (error) {
//     console.error("Unable to create genre:", error);
//   }
// })();


(async function getGenres() {
  try {
    const genres = await Genre.findAll();
    console.log("genre: ", genres[1].toJSON());
  } catch (error) {
    console.error("Unable to create genre:", error);
  }
})();
