const categoryModel = require('../models/category_model')
const errorMessage = require('../core/error.reason')
const errorCode = require('../core/status.code')

module.exports = {
    getCategoryList: async (query) => {
        return await categoryModel.find(query)
    },

    addCategory : async (data, photo) => {
        data.photo = photo.path
        return await categoryModel.create(data)
    },

    getCategoryById :  async (categoryId) => {
        const result = await categoryModel.findById(categoryId);
        if (!result) throw new Error(errorMessage.NOT_FOUND, errorCode.NOT_FOUND);
        return result;
    },

    updateCategoryById :  async (categoryId, data, photo) => {
        data.photo = photo ? photo.path : data.photo
        return await categoryModel.findByIdAndUpdate(categoryId, data, { new: true, runValidators: true })
    },

    deleteCategoryById :  async (categoryId) => {
        return await categoryModel.findByIdAndDelete(categoryId)
    },

    updateMultiStatus :  async (Ids, status) => {
        const result = await categoryModel.updateMany(
            { _id: { $in: Ids } }, 
            { $set: { status: status } });
        return result;
    },

    updateSingleStatus :  async (id, status) => {
        let newStatus  = status == 'active' ? 'inactive' : 'active'
        const result = await categoryModel.findByIdAndUpdate( id,
            {status: newStatus}, {new: true}
        );
        return result
    },

    updateOrdering: async (id, newOrdering) => {
        try {
            const result = await categoryModel.findByIdAndUpdate( id,
                {ordering: newOrdering}, {new: true}
            );
            return result
        } catch (error) {
            throw error;
        }
    },

    deleteCategory: async (ids) => {
        const result = await categoryModel.deleteMany(
            { _id: { $in: ids } })
        return result;
    },
}
