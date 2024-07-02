
const articleService = require('../services/article_service');
const linkChangStatus = '/admin/article/update-single-status'
const categoryModel = require('../models/category_model')
const tagModel = require('../models/tag_model')

module.exports = {
    getArticle : async(req, res, next) => {
        const searchTerm = req.query.keyword
        const status = req.query.status
        let articles = res.locals.articles
        const allArticles = res.locals.articles
        const active = res.locals.articles.filter(article => article.status === 'active')
        const inactive = res.locals.articles.filter(article => article.status === 'inactive')
        const tags = res.locals.tags
        if(searchTerm){
            articles = await articleService.searchArticles(searchTerm);
        }
        if(status){
            articles = await articleService.getArticlesByStatus(status);
        }
        res.render('backend/page/article/list', {articles, active, inactive, allArticles, linkChangStatus, tags})
    },

    getArticleById : async (req , res , next) => {
        const articleId = req.params.id;
        const categories = res.locals.categories
        const tags = res.locals.tags
        let article = {}
        let categoryName = ''
        if (articleId) {
            const result = await articleService.getArticleById(articleId);
            article = result.article
            categoryName = result.categoryName
        }
        
        res.render('backend/page/article/form', {article, categories,tags, categoryName}); 
    },

    searchArticles: async (req , res , next) => {
        const searchTerm = req.body.searchTerm;
        console.log(searchTerm)
        const articles = await articleService.searchArticles(searchTerm);
        const tags = res.locals.tags
        res.render('backend/page/article/list', {articles, linkChangStatus, tags})
    },
    
    addArticle : async (req , res , next) => {
        const data = req.body;
        const tags = res.locals.tags
        const thumbnail = req.file.path

        // parse the tags from the input
        const inputTags = data.tags
        const parsedArray = JSON.parse(inputTags);
        const inputTagsArray = parsedArray.map(item => item.value);

        // concat the tags and remove the duplicates
        const newTags = [...new Set(inputTagsArray.concat(tags[0].name))].filter(tag => tag !== undefined);
        
        await tagModel.findByIdAndUpdate(tags[0]._id, {
            $set: { name: newTags }
        });

        const result = await articleService.addArticle(data, thumbnail, newTags);
        if(result._id){
            req.flash('success', 'Article updated successfully!',false);
            res.redirect('/admin/article');
        }
    },

    updateArticleById : async (req , res , next) => {
        const articleId = req.params.id;
        const data = req.body
        const thumbnail = req.file
        const tags = res.locals.tags

        // parse the tags from the input
        const inputTags = data.tags
        const parsedArray = JSON.parse(inputTags);
        const inputTagsArray = parsedArray.map(item => item.value);

        // concat the tags and remove the duplicates
        const newTags = [...new Set(inputTagsArray.concat(tags[0].name))].filter(tag => tag !== undefined);
        await tagModel.findByIdAndUpdate(tags[0]._id, {
            $set: { name: newTags }
        });

        const currentArticle = await articleService.getArticleById(articleId)
        const result = await articleService.updateArticleById(articleId, data, thumbnail, currentArticle.thumbnail,newTags);
        if(result) res.redirect('/admin/article')
    },

    deleteArticleById : async (req , res , next) => {
        const articleId = req.params.id;
        await articleService.deleteArticleById(articleId);
        res.redirect('/admin/article')
    },

    updateMultiStatus : async (req , res , next) => {
        const data = req.body
        const Ids= data['ids[]']
        const status = data.status
        console.log("data", Ids, status)
        const result = await articleService.updateMultiStatus(Ids, status);
        res.send({
        success: true,
        result
        })
    },

    updateSingleStatus : async (req , res , next) => {
        const {id, status} = req.body;
        const result = await articleService.updateSingleStatus(id, status);
        res.send({
             success: true,
             result
         })
    },

    uploadPhotos : async (req , res , next) => {
        try {
            console.log(req.file.path)
            if (req.file) {
                res.status(200).json({
                    key: req.file.filename,
                    photo_url: req.file.path,
                });
                console.log(photo_url)
            } else {
                res.status(500).json({ error: 'Failed to upload file' });
            }
        } catch (error) {
            res.send(error)
        }
    },

    deleteArticle : async (req , res , next) => {
        const data= req.body
        const ids= data['Ids[]']
        const result = await articleService.deleteArticle(ids);
        res.send({
            success: true,
            result
        })
    }
}
