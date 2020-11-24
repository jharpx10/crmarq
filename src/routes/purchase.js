const express = require('express');
const pool = require('../../database/database');
const router = express.Router();
const chart = require('chart.js');

router.get('/purchase', async (req, res) => {
    const purchases = await pool.query('SELECT p.id, c.name, p.date, p.totalValue FROM CLIENT c JOIN PURCHASE p ON c.id = p.client');
    const purchasesByClient = await pool.query('SELECT c.id, c.name ,SUM(p.totalValue) as Total FROM CLIENT c JOIN PURCHASE p ON c.id = p.client GROUP BY c.id');
    res.render('purchase/purchase', { purchases, purchasesByClient});
});

module.exports = router;