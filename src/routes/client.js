const express = require('express');
const pool = require('../../database/database');
const router = express.Router();
const chart = require('chart.js');

const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

router.get('/', isLoggedIn, async (req, res) => {
    const clients = await pool.query('SELECT c.id, c.name, c.email FROM CLIENT c ');
   
    
    res.render('client/client', { clients });

});

router.get('/classifierValue', isLoggedIn, async (req, res) => {
    const clients = await pool.query('SELECT c.id, c.name, c.email FROM CLIENT c ');


    res.render('client/client', { clients });

});
router.get('/validity', isLoggedIn, async (req, res) => {
    var clients = await pool.query('SELECT c.id, c.name, c.email FROM CLIENT c ');
    const fecha = new Date();
    console.log(fecha);
    const formato = (fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear());
    await clients.forEach (async d => {
        const purchasesClient = await pool.query('SELECT p.date FROM PURCHASE p JOIN CLIENT c on p.client = c.id AND c.id=? ORDER BY date DESC', d.id);
        
        if (purchasesClient[0].date < fecha) {
            d.type = '1'
        }
        else {
            d.type = '2'
        }  
        console.log(d);


    });
    console.log("hola",clients);

    res.json( clients );

});

module.exports = router;
