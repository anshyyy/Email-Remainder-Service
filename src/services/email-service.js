const sender = require('../config/emailConfig');

const sendBasicEmail = async(mailfrom, mailTo, mailSubject, mailBody) => {
    try {
       const response = await sender.sendMail({
            from: mailfrom,
            to: mailTo,
            subject: mailSubject,
            text: mailBody
        });
    } catch (error) {
         console.log(error);
    }
}
module.exports = {
    sendBasicEmail
}

