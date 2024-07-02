const { Schema , model } = require("mongoose")
const validator = require('validator');

const SettingModel = new Schema({
    id: {
        type: Schema.Types.ObjectId,
    },
    "social_settings": {
        type: Object,
        "facebook_url": {
            type: String,
        },
        "instagram_url": {
            type: String,
        },
        "twitter_url": {
            type: String,
        },
    },
    "email_settings": {
        type: Object,
        "senderName": {
            type: String,
        },
        "senderEmail": {
            type: String,
        },
        "subject": {
            type: String,
        },
        "body": {
            type: String,
        }
    },
    "general_info": {
        type: Object,
        "logo": {
            type: String,
        },
        "favicon": {
            type: String,
        },
        "site_name": {
            type: String,
        },
        "about": {
            type: String,
        },
        "contact": {
            type: String,
        }
    },
    "ads": {
        type: Object,
        "ads_1": {
            type: String,
        },
        "ads_2": {
            type: String,
        }
    }
},{ timestamps: true })


module.exports = model('settings' , SettingModel )

