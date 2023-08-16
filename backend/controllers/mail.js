const nodemailer = require('nodemailer');

exports.sendEmail = (req, res) => {
  const { name, email, tel, object, message } = req.body;
  console.log(req.body);

  // Configuration de Nodemailer pour envoyer le mail
  const transporter = nodemailer.createTransport({
    host: 'node197-eu.n0c.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL,
      pass: process.env.MP_MAIL,
    },
  });

  const mailOptions = {
    from: email,
    to: 's.malka@live.fr',
    subject: object,
    text: `Nom et prénom : ${name}\nTéléphone : ${tel}\n\n${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Erreur lors de l'envoi du courrier électronique");
    } else {
      console.log('Courrier électronique envoyé : ' + info.response);
      res.send('Courrier électronique envoyé avec succès');
    }
  });
};
