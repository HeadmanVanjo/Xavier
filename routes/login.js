const express = require('express');
const router = express.Router()

// ================ login route ==============
router.get('/', (req, res) => {
    res.render('login/form', { layout: 'loginLayout' })
});


module.exports = router