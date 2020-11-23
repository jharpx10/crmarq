const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
    res.render('authorization/signin');
});

module.exports = router;