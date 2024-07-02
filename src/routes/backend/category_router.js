const express = require('express')

const router = express.Router()
const categoryController = require('../../controllers/category_controller')
const {asyncHandle} = require('../../utils/asyncHandle');
const {createUploader} = require('../../configs/multer')
const upload = createUploader('category')

router
    .route('/')
    .get(asyncHandle(categoryController.getCategory))

router
    .route('/form/:id')
    .post(upload.single('photo'), asyncHandle(categoryController.updateCategoryById))

router
    .route('/form(/:id)?')
    .get(asyncHandle(categoryController.getCategoryById))

router
    .route('/form')
    .post(upload.single('photo'), asyncHandle(categoryController.addCategory))

router
    .route('/form/:id')
    .delete(asyncHandle(categoryController.deleteCategoryById))

router
    .route('/update-multi-status')
    .post(asyncHandle(categoryController.updateMultiStatus))

router
    .route('/update-single-status')
    .post(asyncHandle(categoryController.updateSingleStatus))

router
    .route('/update-ordering')
    .post(asyncHandle(categoryController.updateOrdering))    

router
    .route('/')
    .delete(asyncHandle(categoryController.deleteCategory))

router
    .route('/delete/:id')
    .get(asyncHandle(categoryController.deleteCategoryById))
    
module.exports = router;