var express = require('express');
var router = express.Router();
const categoryService = require('../services/category_service')

router.use(async (req, res, next) => {
    const categories = await categoryService.getCategoryList({})
    const activeCategories = categories.filter(category => category.status === 'active');
res.locals.categories = activeCategories;
next();
})

router.use('/admin' , require('./backend'))
router.use('/' , require('./frontend'))

module.exports = router;