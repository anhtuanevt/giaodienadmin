const express = require('express')

const router = express.Router()
const articleController = require('../../controllers/article_controller')
const {asyncHandle} = require('../../utils/asyncHandle');
const {createUploader} = require('../../configs/multer')
const upload = createUploader('article')

router
    .route('/')
    .get(asyncHandle(articleController.getArticle))

router
    .route('/')
    .post(asyncHandle(articleController.searchArticles))

router
    .route('/')
    .delete(asyncHandle(asyncHandle(articleController.deleteArticle)))

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
    .route('/delete/:id')
    .get(asyncHandle(articleController.deleteArticleById))

module.exports = router;

