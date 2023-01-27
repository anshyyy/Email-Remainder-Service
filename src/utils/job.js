const cron = require('node-cron');
const sender = require('../config/emailConfig');
const EmailService = require('../services/ticket-service');
const emailService = new EmailService();
const setupJobs = () => {
    cron.schedule('*/1 * * * *', async () => {
        const response = await emailService.get({ status: "PENDING" });
        response.forEach(email => {
            var data = JSON.parse(email.content);
            console.log("emaisadfasfadsfasfdasfdsfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffl",data)
            console.log(data.userId);
            if (email.status != 'SUCCESS') {
                sender.sendMail({
                    to: email.recepientEmail,
                    subject: email.subject,
                    text: "Get ready for Take-off",
                    attachments: [{
                        filename: 'flightTickets.pdf',
                        path: `./src/utils/tickets/flightTickets${data.userId}.pdf`,
                        contentType: 'application/pdf'
                      }],
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