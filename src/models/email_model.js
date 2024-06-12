const { Schema , model } = require("mongoose")
const validator = require('validator');

const EmailModel = new Schema({
    recipient: {
        type: String, 
        required: true,
        validate: {
            validator: validator.isEmail,
            message: props => `${props.value} is not a valid email address!`
        }
    },
    subject: {
        type: String, 
        required: true,
    },
    message: {
        type: String, 
        required: true,
    },
},{ timestamps: true })


module.exports = model('emails' , EmailModel )

