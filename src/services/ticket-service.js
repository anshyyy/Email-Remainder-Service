const sender = require('../config/emailConfig');
const TicketRepository = require('../repository/ticket-repository');


class TicketService {
    constructor() {
        this.ticketRepo = new TicketRepository();
    }
    sendBasicEmail = async (mailfrom, mailTo, mailSubject, mailBody) => {
        try {
            const response = await sender.sendMail({
                from: mailfrom,
                to: mailTo,
                subject: mailSubject,
                text: mailBody
            });
            return response;
        } catch (error) {
            console.log(error);
            throw(error);
        }
    }
     fetchPendingEmails = async () => {
        try {
            const response = await this.ticketRepo.getAll();
            return response;
        } catch (error) {
            console.log(error);
            throw(error);
        }
    }

    create = async(data) => {
        try {
            const response = await this.ticketRepo.create(data);
            return response;
        } catch (error) {
            console.log("Something went wrong in email Service");
            throw(error);
        }
    }

}
module.exports = TicketService;

