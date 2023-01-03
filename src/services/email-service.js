const sender = require('../config/emailConfig');

const sendBasicEmail = (mailfrom,mailTo,mailSubject,mailBody) => {
    sender.sendMail({
        from:mailfrom,
        to:mailTo,
        subject:mailSubject,
        text:mailBody
    });
}
module.exports = {
    sendBasicEmail
}

