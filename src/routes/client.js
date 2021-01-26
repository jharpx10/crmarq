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
    const fecharestada = fecha.setDate(fecha.getDate() - 15);
    console.log("fecharestada",fecharestada);
    for (let i = 0; i < clients.length; i++) {
        const purchasesClient = await pool.query('SELECT p.date FROM PURCHASE p JOIN CLIENT c on p.client = c.id AND c.id=? ORDER BY date DESC', clients[i].id);
        if (purchasesClient[0].date >= fecharestada) {
            clients[i].type = 'bueno'
        }
        else {
            clients[i].type = 'malo'
        }

    }
    

    res.json( clients );

});
router.get('/frecuency', isLoggedIn, async (req, res) => {
    var clients = await pool.query('SELECT c.id, c.name, c.email FROM CLIENT c ');

    for (let i = 0; i < clients.length; i++) {
        const purchasesClient = await pool.query('SELECT COUNT(*) as amount FROM PURCHASE p JOIN CLIENT c on p.client = c.id AND c.id=? ORDER BY amount', clients[i].id);
        if (purchasesClient[0].amount >=  10) {
            clients[i].type = 'bueno'
        }
        else {
            clients[i].type = 'malo'
        }
        
    }
    console.log(clients);
    res.json(clients);

});
router.get('/volumen', isLoggedIn, async (req, res) => {
    var clients = await pool.query('SELECT c.id, c.name, c.email FROM CLIENT c ');

    for (let i = 0; i < clients.length; i++) {
        const purchasesClient = await pool.query('SELECT SUM(p.totalValue) as value FROM PURCHASE p JOIN CLIENT c on p.client = c.id AND c.id=? ORDER BY c.id', clients[i].id);
        if (purchasesClient[0].value >= 45000) {
            clients[i].type = 'bueno'
        }
        else {
            clients[i].type = 'malo'
        }

    }
    res.json(clients);

});

module.exports = router;
