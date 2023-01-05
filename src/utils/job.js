const cron = require('node-cron');
const EmailService = require('../services/ticket-service');
const emailService = new EmailService();
const setupJobs = () => {
    cron.schedule('*/1 * * * *', async()=>{
             const response = await emailService.get({status:"PENDING"});
             
             console.log(response);
    });
}

module.exports = setupJobs;