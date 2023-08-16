"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};
const { DB_FORCE_RESTART } = process.env;

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js" && file.indexOf(".test.js") === -1;
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
// console.log(db.sequelize);
db.Sequelize = Sequelize;
// console.log(db.Sequelize);

/**
 *BLOC DE génération auto de la base SQL (remplace les CREATE TABLE dans les controllers)
 */
// const sequelizeOptions = { logging: console.log };

// // Removes all tables and recreates them (only available if env is not in production)
// if (DB_FORCE_RESTART === 'true' && process.env.ENV !== 'production') {
//   sequelizeOptions.force = false;
// }

// sequelize.sync(sequelizeOptions).catch((err) => {
//   console.log(err);
//   process.exit();
// });

/**
 *BLOC DE génération auto d'une table SQL pour un Model en particulier
 */
const sequelizeOptions = { logging: console.log };
const dbModel = require("./users" && "./projects")(sequelize, Sequelize.DataTypes); // on charge le Model pour que Sequelize puisse créer la structure de la table dans la BDD
if (DB_FORCE_RESTART === "true" && process.env.ENV !== "production") {
  sequelizeOptions.force = false;
}
dbModel
  .sync(sequelizeOptions)
  .then((result) => {
    console.log(result);
    console.log("Model synchronisé, BDD SQL à jour !!!");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = db;
