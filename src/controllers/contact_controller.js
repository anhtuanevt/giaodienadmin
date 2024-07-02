
const contactService = require('../services/contact_service');
const sendEmail = require('../utils/nodemailer')
const emailSettingsService = require('../services/setting_service')

module.exports = {
    getContact : async(req, res, next) => {
        const contacts = await contactService.getContactList({});
        res.render('backend/page/contact/list', {contacts})
    },

    getContactById : async (req , res , next) => {
        try {
            const contactId = req.params.id;
            console.log(contactId)
            let contact = {
                "name": "",
                "email":"",
                "status": "active"
            }
            if(contactId) contact = await contactService.getContactById(contactId);
            res.render('backend/page/contact/form',{contact }); 
        } catch (error) {
            return error
        }
    },

    addContact : async (req , res , next) => {
        const FormData = req.body
        const result = await contactService.addContact(FormData);
        const emailSettings = await emailSettingsService.getEmailSettings();
        if(result._id) {
            await sendEmail(emailSettings.senderEmail, emailSettings.senderName,
                    FormData.email, emailSettings.senderSubject, emailSettings.senderMessage);
            res.send({
                success: true
            });
        } 
    },

    updateContactById : async (req , res , next) => {
        const categoryId = req.params.id;
        const data = req.body
        try {
            const result = await contactService.updateContactById(categoryId, data);
            if(result._id) res.redirect('/admin/contact')
        } catch (error) {
            res.send(error)
        }
    },

    deleteContactById : async (req , res , next) => {
        const contactId = req.params.id;
        await contactService.deleteContactById(contactId);
        res.redirect('/admin/contact')
    },

    deleteContact : async (req , res , next) => {
        const data = req.body
        const ids = data['Ids[]']
        const result = await contactService.deleteContact(ids);
        res.send({
            success: true,
            result
        })
    },
    
}
