
const express = require('express');
const router = express.Router();
const passport = require('passport');
const nodemailer = require("nodemailer");
require('dotenv').config();
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');
const AccessToken = require('twilio/lib/jwt/AccessToken');


router.post('/sendemail', isLoggedIn, async (req, res) => {

    const { email, subject, message } = await req.body;

    console.log(process.env.EMAIL);
    console.log(process.env.EMAIL_PASSWORD);
    //let testAccount = await nodemailer.createTestAccount();
    let transporter = await nodemailer.createTransport({
        service: "gmail",
   
        auth: {
            user: process.env.email, // generated ethereal user
            pass: process.env.email_password, // generated ethereal password
        },
    });



     await transporter.sendMail({
         from: "Crm supermaket", // sender address
         to: [email], // list of receivers
         subject: subject, // Subject line
         text: message, // plain text body
     //   html: "<b>Muchachos recuerden la reunión a la 10  el lunes</b>", // html body
    }, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log(info)
            }
        }         
            );
   
    
    res.redirect('/admin/purchase');

});

router.get('/sendsms', isLoggedIn, async (req, res) => {
    const accountSid = process.env.ACCOUNT_SID;
    const authToken = process.env.AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);
    client.messages.create({
        to: '+573116280399',
        from: '+17038280769',
        body: 'Muchachos recuerden la reunion a la 1'
    }).then(message => console.log(message.sid));
});


router.get('/:email', isLoggedIn, async (req, res) => {
    const { email } = req.params;
   
    res.render('message/message', {email});
});


module.exports = router;