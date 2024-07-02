const ContactModel = require('../models/contact_model')

module.exports = {
    getContactList: async (query) => {
        return await ContactModel.find(query)
    },

    getContactById :  async (contactId) => {
        return await ContactModel.findById(contactId)
    },
   
    addContact : async (data) => {
        return await ContactModel.create(data)
    },

    updateContactById :  async (id, data) => {
        return await ContactModel.findByIdAndUpdate(id, data, { new: true, runValidators: true })
    },

    deleteContactById :  async (contactId) => {
        return await ContactModel.findByIdAndDelete(contactId)
    },

    deleteContact : async (ids) => {
        return await ContactModel.deleteMany({ _id: { $in: ids } })
    },

}
