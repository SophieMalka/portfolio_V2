const express = require('express');
const router = express.Router();
const mailController = require('../controllers/mail');
const rateLimit = require('../middlewares/rate-limit');

router.post('/send-email', rateLimit, mailController.sendEmail);

module.exports = router;
