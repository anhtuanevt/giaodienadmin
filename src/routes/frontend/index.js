const express = require('express')
const router = express.Router();
const helper = require('../../helper/ejs-hepler');

router.use(async(req, res, next) => {
    const categories = res.locals.categories
    const activeCategories = categories.filter(category => category.status === 'active');
    res.locals.categories = activeCategories;
    
    const articles = res.locals.articles
    const activeArticles = articles.filter(article => article.status === 'active');
    res.locals.articles = activeArticles;

    const popularArticles = activeArticles.filter(article => article.is_hot == true);
    res.locals.popularArticles = popularArticles;

    const homeArticles = activeArticles.filter(article => article.is_home == true);
    res.locals.homeArticles = homeArticles;

    const latestArticles = activeArticles.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.locals.latestArticles = latestArticles;

    res.locals.helper = helper;
    next();
});

router.use((req, res, next) => {
    req.app.set('layout', 'frontend/index.ejs');
    next();
});


router.use('/contact' , require('./contact'))
router.use('/' , require('./home'))

module.exports = router