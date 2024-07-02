const express = require('express')

const router = express.Router()
const contactController = require('../../controllers/contact_controller')
const validator = require('../../utils/validator')

router
    .route('/')
    .get(contactController.getContact)

router
    .route('/')
    .delete(contactController.deleteContact)

router
    .route('/form(/:id)?')
    .get(contactController.getContactById)

router
    .route('/form')
    .post(contactController.addContact)

router
    .route('/form/:id')
    .post(contactController.updateContactById)

router
    .route('/delete/:id')
    .get(contactController.deleteContactById)

module.exports = router;

