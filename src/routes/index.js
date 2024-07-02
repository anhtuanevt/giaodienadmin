var express = require('express');
var router = express.Router();
const categoryService = require('../services/category_service')
const tagModel  = require('../models/tag_model')
const articleService = require('../services/article_service');
const setting_service = require('../services/setting_service');

router.use(async (req, res, next) => {
    const categories = await categoryService.getCategoryList({})
    res.locals.categories = categories;

    const tags = await tagModel.findOne({});
    res.locals.tags = tags.name

    const articles = await articleService.getArticleList({})
    res.locals.articles = articles;

    const settings = await setting_service.getSettings();
    res.locals.settings = settings;
    next();
})

router.use('/admin' , require('./backend'))
router.use('/' , require('./frontend'))

module.exports = router;