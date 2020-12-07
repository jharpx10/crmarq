
const express = require('express');
const router = express.Router();
const passport = require('passport');
const nodemailer = require("nodemailer");
require('dotenv').config();

const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');
const AccessToken = require('twilio/lib/jwt/AccessToken');


router.get('/sendemail', isLoggedIn,async (req, res) => {
    //let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        service: "gmail",
   
        auth: {
            user: "crmsupermarketarqsw@gmail.com", // generated ethereal user
            pass: "marketsuper", // generated ethereal password
        },
    });
   

     await transporter.sendMail({
        from: "Fred Foo", // sender address
         to: ["juana.rios@udea.edu.co", "sebastian.lopezs@udea.edu.co", "david.ballesteros@udea.edu.co",
             'jfernando.mosquera@udea.edu.co'], // list of receivers
        subject: "Hello", // Subject line
     //   text: "Hello world?", // plain text body
        html: "<b>Muchachos recuerden la reunión a la 10  el lunes</b>", // html body
    }, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log(info)
            }
        }         
            );
   

    console.log('mensaje enviado');


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


module.exports = router;