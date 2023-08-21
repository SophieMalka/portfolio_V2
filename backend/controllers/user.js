const dbModels = require("../models");
console.log(dbModels);
const User = dbModels.users;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * C'est cette méthode que j'ai revue. Utilisation de findOne avec un where en param. C'est une promesse, donc tu peux reprendre ensuite (then) le code que tu as écrit pour tes controllers
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({
    where: { email: email },
  })
    .then((user) => {
      if (!user) {
        console.log(`Utilisateur inconnu : ${email} `);
        res.status(401).send("Utilisateur inconnu");
      } else {
        bcrypt
          .compare(password, user.password)
          .then((valid) => {
            if (!valid) {
              console.log(`Connexion NON réussie : ${user.email} `);
              res.statut(401).send("Check your password.");
            } else {
              console.log(`Connexion réussie : ${user.email} `);
              const token = jwt.sign({ userId: user.id }, process.env.TOKEN_SECRET, { expiresIn: "4h" });
              res.status(200).json({ token });
            }
          })
          .catch((err) => {
            console.log(err);
            res.statut(500).send("Error !");
          });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.statut(500).send("Error !");
    });
};

exports.signup = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({
    where: { email: email },
  })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(409).json({ message: "Cet email est déjà utilisé." });
      }

      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Une erreur est survenue lors de la création du compte.");
        }

        User.create({ email: email, password: hashedPassword })
          .then((user) => {
            const token = jwt.sign({ userId: user.id }, process.env.TOKEN_SECRET, { expiresIn: "4h" });
            res.status(201).json({ token });
          })
          .catch((err) => {
            console.error(err);
            res.status(500).send("Une erreur est survenue lors de la création du compte.");
          });
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Une erreur est survenue lors de la création du compte.");
    });
};

// exports.findAll = (req, res, next) => {
//   User.findAll({
//     order: [["id", "DESC"]],
//   })
//     .then((data) => {
//       res.status(200).json(data);
//     })
//     .catch((err) => {
//       console.log(err);
//       return statut.responseError(res, 500, "Error !");
//     });
// };

// exports.findOne = (req, res, next) => {
//   User.findByPk(req.params.id)
//     .then((data) => {
//       if (data) {
//         res.status(200).json(data);
//       } else {
//         return statut.responseError(res, 404, msgTxt.concat("User not found."));
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       return statut.responseError(res, 500, `Error retrieving User with id : ${id}`);
//     });
// };
