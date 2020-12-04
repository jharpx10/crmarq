const passport = require('passport');//Así puedo utilizar el tipo de autenticación que quiero
//Passport permite hacer autenticaciones a traves de medios sociales tipo, twitter, google, facebook,etc y local

const localStrategy = require('passport-local').Strategy;
const pool = require('../../database/database');

passport.use('local.signin', new localStrategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
}, async(req, username, password, done) => {
   const rows =  await pool.query('SELECT * FROM ADMIN WHERE name = ?', [username]);
    if(rows.length > 0){
        const user = rows[0];
        //const validPassword = await helpers.matchPassword(password, user.password);
        if (password === user.password) {
            done(null, user, req.flash('success','Welcome ' + user.username));
        }else {
            done(null, false, req.flash('message','Incorrect Password'));
        }
    }else {
        return done(null, false, req.flash('message','The username does not exists'));
    }
}));

//Middlewares para serializar y desserializar al usuario
passport.serializeUser((user, done) => {
    done(null, user.id);//Cuando serializo estoy guardando el id del usuario
});

passport.deserializeUser(async(id, done) => {//Cuando deserializo estoy tomando el id almacenado para volver a obtener los datos 
    const rows = await pool.query('SELECT * FROM ADMIN WHERE id = ?', [id]);
    done(null, rows[0]);
});