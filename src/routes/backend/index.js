const express = require('express')
const router = express.Router()


router.use((req, res, next) => {
    req.app.set('layout', 'backend/index.ejs');
    next();
});

router.use('/',require('./dashboard'))
router.use('/category',require('./category_router'))
router.use('/article',require('./article_router'))
router.use('/contact',require('./contact_router'))
router.use('/settings',require('./settings_router'))



module.exports = router