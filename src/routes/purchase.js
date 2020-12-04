const express = require('express');
const pool = require('../../database/database');
const router = express.Router();
const chart = require('chart.js');

const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

router.get('/purchase', isLoggedIn, async (req, res) => {
    const purchases = await pool.query('SELECT p.id, c.name, p.date, p.totalValue FROM CLIENT c JOIN PURCHASE p ON c.id = p.client');
    const purchasesByClient = await pool.query('SELECT c.id, c.name ,SUM(p.totalValue) as Total FROM CLIENT c JOIN PURCHASE p ON c.id = p.client GROUP BY c.id');

    res.render('purchase/purchase', { purchases, purchasesByClient });
});

module.exports = router;