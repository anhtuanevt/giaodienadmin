const express = require('express')
const router = express.Router();

router.use((req, res, next) => {
    req.app.set('layout', 'frontend/index.ejs');
    next();
});


router.use('/' , require('./home'))
router.use('/contact' , require('./contact'))
router.use('/:slug' , require('./category'))

module.exports = router