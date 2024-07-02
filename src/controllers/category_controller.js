
const categoryService = require('../services/category_service');
const item = "category"
const linkChangStatus = '/admin/category/update-single-status'

module.exports = {
    getCategory :async(req, res, next) => {
        let query = (req.query.status) ? {status: req.query.status} : {}
        const filter_categories = await categoryService.getCategoryList(query);
        const categories = res.locals.categories

        // const categories = await categoryService.getCategoryList({})
        const activeCategories = categories.filter(category => category.status === 'active');
        const inactiveCategories = categories.filter(category => category.status === 'inactive');

        res.render(`backend/page/${item}/list`, {filter_categories, linkChangStatus,
            categories,
            activeCategories: activeCategories.length,
            inactiveCategories: inactiveCategories.length })
    },

    getCategoryById : async (req , res , next) => {
        const categoryId = req.params.id;
        let category = {
            name: "",
            ordering: "",
            status: "active",
        }
        if (categoryId) category = await categoryService.getCategoryById(categoryId);
        res.render(`backend/page/${item}/form`,{category }); 
    },

    addCategory : async (req , res , next) => {
        const data = req.body
        const photo = req.file
        const result = await categoryService.addCategory(data, photo);
        if(result._id) {
        req.flash('success', 'Category updated successfully!',false);
            res.redirect(`/admin/${item}`);
        } 
    },

    updateCategoryById : async (req , res , next) => {
        const categoryId = req.params.id;
        const data = req.body
        const photo = req.file
        const result = await categoryService.updateCategoryById(categoryId, data, photo);
        if(result._id) res.redirect(`/admin/${item}`)
    },

    deleteCategoryById : async (req , res , next) => {
        const categoryId = req.params.id;
        await categoryService.deleteCategoryById(categoryId);
        res.redirect(`/admin/${item}`)
    },

    updateMultiStatus : async (req , res , next) => {
        const data = req.body
        const Ids= data['ids[]']
        const status = data.status
        const result = await categoryService.updateMultiStatus(Ids, status);
        res.send({
        success: true,
        result
        })
    },

    updateSingleStatus : async (req , res , next) => {
        const {id, status} = req.body;
        const result = await categoryService.updateSingleStatus(id, status);
        res.send({
             success: true,
             result
         })
    },

    updateOrdering : async (req , res , next) => {
        const {id, newOrdering} = req.body;
        const result = await categoryService.updateOrdering(id, newOrdering);
        res.send({
            success: true,
             result
         })
    },

    deleteCategory : async (req , res , next) => {
        const data= req.body
        const ids= data['Ids[]']
        const result = await categoryService.deleteCategory(ids);
        res.send({
            success: true,
            result
        })
    },
}
