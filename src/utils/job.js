const cron = require('node-cron');
const sender = require('../config/emailConfig');
const EmailService = require('../services/ticket-service');
const emailService = new EmailService();
const setupJobs = () => {
    cron.schedule('*/1 * * * *', async () => {
        const response = await emailService.get({ status: "PENDING" });
        response.forEach(email => {
            if (email.status != 'SUCCESS') {
                sender.sendMail({
                    to: email.recepientEmail,
                    subject: email.subject,
                    text: email.content
                }, async (err, data) => {
                    if (err) {
                        console.log(err);
                        throw (err);
                    } else {
                        console.log(data);
                        await emailService.updateTicket(email.id, { status: "SUCCESS" });
                    }
                });
            }
        });
        console.log(response);
    });
}

module.exports = setupJobs;