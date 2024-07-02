const settingsModel = require('../models/settings_model')

module.exports = {
    getEmailSettings : async () => {
        const result = await emailSettingsModel.findOne({}).sort({createdAt: -1}) 
        if (!result) return {};
        return result
    },

    getSettings : async () => {
        const result = await settingsModel.findOne({}).sort({createdAt: -1}) 
        if (!result) return {};
        return result
    },

    updateSettings: async (data) => {
        const item = await settingsModel.findOne({}).sort({createdAt: -1})
        if (!item) return null; 
        const result = await settingsModel.updateOne({_id: item._id}, data)
        return result
    }
}

