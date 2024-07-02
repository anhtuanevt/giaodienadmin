const articleModel = require('../models/article_model')
const categoryModel = require('../models/category_model')
const cloudinary = require('../configs/cloundinary')

module.exports = {
    getArticleList: async () => {
        return await articleModel.find({}).sort({ createdAt: -1 }).populate('category_id');
    },

    addArticle: async function(data, thumbnail, newTags) {
        data.is_home = (data.is_home) ? true : false;
        data.is_hot = (data.is_hot) ? true : false;
        data.thumbnail = thumbnail
        data.tags = newTags

        const newArticle = await articleModel.create(data);
        return newArticle;
    },
    searchArticles: async (searchTerm) => {
        const articles = await articleModel.find(
            { $text: { $search: searchTerm } },
            { score: { $meta: "textScore" } }
            ).sort({ score: { $meta: "textScore" } })
            .populate('category_id');
        return articles;
    },

    getArticlesByStatus: async (status) => {
        const articles = await articleModel.find({status: status}).populate('category_id');
        return articles;
    },

    getArticleById :  async (articleId) => {
        const article = await articleModel.findById(articleId).populate('category_id')
        const categoryName =  article.category_id ? article.category_id.name : null;
        return {article, categoryName}
    },

    updateArticleById :  async (articleId, data, thumbnail, currentThumbnail, newTags) => {
        data.is_hot = (data.is_hot) ? true : false;
        data.is_home = (data.is_home) ? true : false;
        data.thumbnail = thumbnail ? thumbnail.path : currentThumbnail
        data.tags = newTags
        return await articleModel.findByIdAndUpdate(articleId, data, { new: true })
    },

    deleteArticleById :  async (articleId) => {
        return await articleModel.findByIdAndDelete(articleId)
    },

    updateSingleStatus :  async (id, status) => {
        let newStatus  = status == 'active' ? 'inactive' : 'active'
        const result = await articleModel.findByIdAndUpdate( id,
            {status: newStatus}, {new: true}
        );
        return result
    },

    updateMultiStatus :  async (Ids, status) => {
        const result = await articleModel.updateMany(
            { _id: { $in: Ids } }, 
            { $set: { status: status } });
        return result;
    },

    updateThumbnail : async (articleId, file) => {
        try {
            let result = await cloudinary.uploader.upload(file.path, {
                folder: 'thumbnail',
                public_id: file.filename,
            } )

            return await articleModel.findByIdAndUpdate(articleId, { thumbnail: result.url }, { new: true })
            } catch (error) {
                throw error;
            }
        },

    deleteArticle: async (Ids, status) => {
        const result = await articleModel.deleteMany(
            { _id: { $in: Ids } })
            return result
    },
}
