const TicketService = require('../services/ticket-service');
const ticketService = new TicketService(); 
const getAll = async (req,res) =>{
     try {
        const tickets = ticketService.fetchPendingEmails();
        return res.status(200).json({
            data : tickets,
            success:true,
            message:"Successfully fetched all tickets",
            err : {}
        })
     } catch (error) {
        return res.status(500).json({
            data:{},
            success:false,
            message:"Not able to fetch all tickets",
        });
     } 
}

const create = async(req,res)=>{
    try {
        data = req.body;
        data.notification = new Date();
        console.log(data);
        const response = await ticketService.create(data);
        
        return res.status(200).json({
            data : response,
            success:true,
            message:"Successfully create a ticket",
            err : {}
        })
    } catch (error) {
        return res.status(500).json({
            data:{},
            success:false,
            message:"Not able to create a ticket",
        });
    }   
}

const get = async(req,res) => {
    try {
        const response = await ticketService.get(req.body);
        return res.status(200).json({
           data:response,
           success:true,
           message:"Successfully fetched a ticket",
           err : {}
        });
    } catch (error) {
        return res.status(500).json({
            data:{},
            success:false,
            message:"Not able to fetch the ticket",
        });
    }
}
module.exports = {
    getAll,
    create,
    get
}