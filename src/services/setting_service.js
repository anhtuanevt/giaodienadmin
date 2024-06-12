const emailSettingsModel = require('../models/email_settings')

module.exports = {
    getEmailSettings : async () => {
        const result = await emailSettingsModel.findOne({}).sort({createdAt: -1}) 
        if (!result) return {};
        return result
    },

    addEmailSettings : async (data) => {
        const result = await emailSettingsModel.create(data)
        return result
    },

    updateEmailSettings : async (data) => {
        const item = await emailSettingsModel.findOne({}).sort({createdAt: -1})
        if (!item) return null; 
        const result = await emailSettingsModel.updateOne({_id: item._id}, data)
        return result
    }
}

