const { Schema , model } = require("mongoose")
const validator = require('validator');

const EmailSettingsModel = new Schema({
    id: {
        type: Schema.Types.ObjectId,
    },
    senderName: {
        type: String, 
        required: true 
    },
    senderEmail: {
        type: String, 
        required: true,
        validate: {
            validator: validator.isEmail,
            message: props => `${props.value} is not a valid email address!`
        }
    },
    senderSubject: {
        type: String, 
        required: true,
    },
    senderMessage: {
        type: String, 
        required: true,
    },
},{ timestamps: true })

module.exports = model('email_settings' , EmailSettingsModel)

