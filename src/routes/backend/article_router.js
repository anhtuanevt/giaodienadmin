const express = require('express')

const router = express.Router()
const articleController = require('../../controllers/article_controller')
const {upload} = require('../../configs/multer')
const {asyncHandle} = require('../../utils/asyncHandle');
router
    .route('/')
    .get(asyncHandle(articleController.getArticle))

router
    .route('/form(/:id)?')
    .get(asyncHandle(articleController.getArticleById))

router
    .route('/form')
    .post(upload.single('thumbnail'), asyncHandle(articleController.addArticle))

router
    .route('/form/:id')
    .post(upload.single('thumbnail'), asyncHandle(articleController.updateArticleById))

router
    .route('/form/:id')
    .delete(asyncHandle(articleController.deleteArticleById))

router
    .route('/update-single-status')
    .post(asyncHandle(articleController.updateSingleStatus))

router
    .route('/update-multi-status')
    .post(asyncHandle(articleController.updateMultiStatus))

router
    .route('/upload-photos')
    .post(upload.single('thumbnail'), asyncHandle(articleController.uploadPhotos))

router
    .route('/')
    .delete(asyncHandle(articleController.deleteArticle))

router
    .route('/delete/:id')
    .get(asyncHandle(articleController.deleteArticleById))

module.exports = router;

