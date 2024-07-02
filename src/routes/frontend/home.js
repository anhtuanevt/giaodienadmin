const express = require('express')
const router = express.Router();

router.get('/' , async (req , res , next) => {
    const categories = res.locals.categories;
    const popularArticles = res.locals.popularArticles;
    const latestArticles = res.locals.latestArticles;
    const homeArticles  = res.locals.homeArticles;
    const helper = res.locals.helper;
    const settings = res.locals.settings;

    // Pagination logic
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const articles = res.locals.articles.slice(startIndex, endIndex);

    res.render('frontend/page/home', {
        categories, 
        articles, 
        popularArticles, 
        latestArticles, 
        homeArticles,
        helper,
        settings,
        currentPage: page,
        totalPages: Math.ceil(res.locals.articles.length / limit)
    })
})

router.get('/:slug' , async (req , res , next) => {
    const slug = req.params.slug;
    const categories = res.locals.categories;

    const currentCategoryPage = categories.find(cat => cat.slug == slug);

    // Pagination logic
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const toalCatAticles = res.locals.articles.filter(article => article.category_id.slug == slug);
    
    articles = toalCatAticles.slice(startIndex, endIndex) 
    const currentArticlePage = res.locals.articles.find(article => article._id.toHexString() == slug);

    const latestArticles = res.locals.articles.slice(0, 6);
    const tags = res.locals.tags
    console.log(tags, typeof(tags))

    if(currentCategoryPage){
        res.render('frontend/page/category', {
            currentCategoryPage, 
            articles,
            currentPage: page,
            totalPages: Math.ceil(toalCatAticles.length / limit)
        })
    }else if(currentArticlePage){
        res.render('frontend/page/post',{currentArticlePage, latestArticles, tags})
    }else{
        next()
    }
})

module.exports = router;

