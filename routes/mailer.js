var express = require('express');
var router = express.Router();
var db = require('../db/db');
var cron = require('node-cron');
var nodemailer = require('nodemailer');

router.post('/', (req, res, next) => {
    let Mail = db.Mongoose.model('mailer', db.MailerSchema, 'mailer');

    const account = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: req.body.user, // Seu usuário no Gmail
            pass: req.body.pass // A senha da sua conta no Gmail
        }
    });

    account.sendMail({
        from: req.body.name + '<' + req.body.from + '>',
        to: '<' + req.body.to + '>', // Para quem o e-mail deve chegar
        subject: req.body.subject, // O assunto
        html: req.body.body, // O HTMl do nosso e-mail
    }, (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            res.end();
            return;
        } else {
            res.json({message: "Email enviado com sucesso."});
            res.end();
        }
    });

});

module.exports = router;