const express = require('express')

const router = express.Router()
const settingsController = require('../../controllers/settings_controller')
const {asyncHandle} = require('../../utils/asyncHandle');
const {createUploader} = require('../../configs/multer')
const upload  = createUploader('settings')

router
    .route('/')
    .get(asyncHandle(settingsController.getSettings))

router
    .route('/')
    .post(asyncHandle(settingsController.updateSettings))

router
    .route('/upload-photo')
    .post(upload.fields([{name: 'logo', maxCount: 1}, {name: 'banner1', maxCount: 1},
                        {name:'banner2', maxCount: 1}, {name:'banner3', maxCount: 1}]),
     asyncHandle(settingsController.uploadImage));


module.exports = router;