
const sendEmail = require('../utils/nodemailer')
const emailSettingsService = require('../services/setting_service')

module.exports = {
    getSettings: async (req, res, next) => {
        const emailSettings = await emailSettingsService.getEmailSettings();
        res.render('backend/page/settings/index', {emailSettings})
    },
    addEmailSettings : async (req , res , next) => {
        const data = req.body
        const result = await emailSettingsService.addEmailSettings(data);
        console.log(result)
    },

    updateEmailSettings : async (req , res , next) => {
        const data = req.body
        const result = await emailSettingsService.updateEmailSettings(data);
        if(result) {
            res.send({
                success: true
            })
        }
    },

    // getContact : async(req, res, next) => {
    //     // let query = (req.query.status) ? {status: req.query.status} : {}
    //     const contact = await contactService.getContactList({});
    //     res.render('backend/page/contact/list', {contact})

    //     // const categories = await categoryService.getCategoryList({})
    //     // const activeCategories = categories.filter(category => category.status === 'active');
    //     // const inactiveCategories = categories.filter(category => category.status === 'inactive');

    //     // res.render('backend/page/category/list', {categories, linkChangStatus,
    //     //     categories,
    //     //     activeCategories: activeCategories.length,
    //     //     inactiveCategories: inactiveCategories.length })
    // },

    // getContactById : async (req , res , next) => {
    //     try {
    //         const contactId = req.params.id;
    //         console.log(contactId)
    //         let contact = {
    //             "name": "",
    //             "email":"",
    //             "status": "active"
    //         }
    //         if(contactId) contact = await contactService.getContactById(contactId);
    //         res.render('backend/page/contact/form',{contact }); 
    //     } catch (error) {
    //         return error
    //     }
    // },

    // addContact : async (req , res , next) => {
    //     const FormData = req.body
    //     const data = {}
    //     // Object.entries(FormData).forEach(([key, value]) => {
    //     //     data[key] = value
    //     // });
    //     // console.log('data', data)
    //     console.log('data', FormData)
    //     try {
    //         const result = await contactService.addContact(FormData);
    //         // const receiver_mail = result.email;
    //         // sendEmail(receiver_mail, 'Test Subject', 'Test Message');
    //         if(result._id) {
    //             res.send({
    //                 success: true
    //             })
    //             // req.flash('success', 'Contact updated successfully!',false);
    //             // res.redirect('/admin/contact');
    //         } 
    //     } catch (error) {
    //         res.send(error)
    //         console.log(error)
    //     }
    // },

    // updateContactById : async (req , res , next) => {
    //     const categoryId = req.params.id;
    //     const data = req.body
    //     try {
    //         const result = await contactService.updateContactById(categoryId, data);
    //         if(result._id) res.redirect('/admin/contact')
    //     } catch (error) {
    //         res.send(error)
    //     }
    // },

    // deleteCategoryById : async (req , res , next) => {
    //     const categoryId = req.params.id;
    //     try {
    //      const result = await categoryService.deleteCategoryById(categoryId);
    //      res.redirect('/admin/category')
    //     } catch (error) {
    //         res.send(error)
    //     }
    // },

    // updateMultiStatus : async (req , res , next) => {
    //     const status = req.params.status;
    //     const Ids= req.body.ids
    //     try {
    //      const result = await categoryService.updateMultiStatus(Ids, status);
    //      res.send({
    //         success: true,
    //         result
    //      })
    //     } catch (error) {
    //         res.send(error)
    //     }
    // },

    // updateSingleStatus : async (req , res , next) => {
    //     const {id, status} = req.body;
    //     try {
    //      const result = await categoryService.updateSingleStatus(id, status);
    //      res.send({
    //          success: true,
    //          result
    //      })
    //     } catch (error) {
    //         res.send(error)
    //     }
    // },

    // updateOrdering : async (req , res , next) => {
    //     const {id, newOrdering} = req.body;
    //     try {
    //      const result = await categoryService.updateOrdering(id, newOrdering);
    //      res.send({
    //          success: true,
    //          result
    //      })
    //     } catch (error) {
    //         res.send(error)
    //     }
    // },

    // deleteCategory : async (req , res , next) => {
    //     const ids= req.body.ids
    //     try {
    //      const result = await categoryService.deleteCategory(ids);
    //      res.send({
    //         success: true,
    //          result
    //      })
    //     } catch (error) {
    //         res.send(error)
    //     }
    // },
}
