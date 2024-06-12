const articleModel = require('../models/article_model')
const categoryModel = require('../models/category_model')
const cloudinary = require('../configs/cloundinary')

module.exports = {
    getArticleList: async () => {
        return await articleModel.find({})
    },

    addArticle: async function(data, thumbnail) {
        try {
            data.is_home = (data.is_home) ? true : false;
            data.is_hot = (data.is_hot) ? true : false;
            data.thumbnail = thumbnail

            const newArticle = await articleModel.create(data);
            await categoryModel.findByIdAndUpdate(data.category_id, {
                $push: { article_id: newArticle._id }
            });
            await articleModel.findByIdAndUpdate(newArticle.id, {thumbnail : thumbnail})
            return newArticle;
        } catch (e) {
            console.log(e);
            throw e.errors;
        }
    },

    getArticleById :  async (articleId) => {
        return await articleModel.findById(articleId)
    },

    updateArticleById :  async (articleId, data, thumbnail, currentThumbnail) => {
        data.is_hot = (data.is_hot) ? true : false;
        data.is_home = (data.is_home) ? true : false;
        data.thumbnail = thumbnail ? thumbnail.path : currentThumbnail
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
        try {
            const result = await articleModel.deleteMany(
                { _id: { $in: Ids } })
            return result;
        } catch (error) {
            throw error;
        }
    },
}
