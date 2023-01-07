const cron = require('node-cron');
const EmailService = require('../services/ticket-service');
const emailService = new EmailService();
const setupJobs = () => {
    cron.schedule('*/1 * * * *', async()=>{
             const response = await emailService.get({status:"PENDING"});
             response.forEach(email => {
                emailService.sendBasicEmail(
                "anshyytests@gmail.com",
                email.recepientEmail,
                email.subject,
                email.content
                );
             });
             console.log(response);
    });
}

module.exports = setupJobs;