const express = require('express');
const router = express.Router();

const pool = require('../../database/database');

router.get('/', (req, res) => {
    res.send('Hello f world');
});

module.exports = router;