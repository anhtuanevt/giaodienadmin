const nodemailer = require('nodemailer');

sendEmail = async (senderEmail, senderName, recipient, subject, message)=> {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'anhtuanevt@gmail.com', 
            pass: 'bqzb elhf hmgv nrac' 
        }
    });

    let mailOptions = {
        from: `${senderName} <${senderEmail}>`, 
        to: recipient,
        subject: subject,
        text: message
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.log('Error sending email:', error);
    }
}

module.exports = sendEmail;

// sendEmail('recipient-email@example.com', 'Test Subject', 'Test Message');
