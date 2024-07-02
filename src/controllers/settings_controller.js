
const settingsService = require('../services/setting_service')


module.exports = {
    getSettings: async (req, res, next) => {
        const settings = await settingsService.getSettings();
        res.render('backend/page/settings/index', {settings})
    },

    updateSettings: async (req, res, next) => {
        const data = req.body
        const result = await settingsService.updateSettings(data);
        if(result) {
            res.send({
                success: true
            })
        }
    },

    uploadImage: async (req, res, next) => {
        const data = req.files
        const result = {};
        for (const key in data) {
            result[key] = data[key][0].path;
        }
        res.send(result);
    }
    
}
