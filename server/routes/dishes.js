const express = require('express');
const router = express.Router();

/* GET api listing. */
router.get('/dishes', (req, res) => {
    res.send('Here are the dishes.');
});

router.get('/dish', (req, res) => {
    res.send('Here is one dish.');
});

// Daniel will have to re-add his routes here. I don't want to copy them over from the dev
// branch because I want his commits to be saved and recorded.

module.exports = router;
