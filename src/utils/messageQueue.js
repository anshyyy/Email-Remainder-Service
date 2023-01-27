const amqplib = require('amqplib');
const {MESSAGE_BROKER_URL,EXCHANGE_NAME}=require('../config/serverConfig');
const TicketService = require('./../services/ticket-service');
const makePdf = require('./pdf-maker');
const ticketService = new TicketService();

const createChannel = async () => {
     try {
          const connection = await amqplib.connect(MESSAGE_BROKER_URL);
          const channel = await connection.createChannel();
          await channel.assertExchange(EXCHANGE_NAME, 'direct');
          return channel;
     } catch (error) {
          throw error;
     }
}

const subscribeMessage = async (channel, service, binding_key) => {
     try {
          const applicationQueue = await channel.assertQueue('TEMP_QUEUE');
          channel.bindQueue(applicationQueue.queue, EXCHANGE_NAME, binding_key);

          channel.consume(applicationQueue.queue, async msg => {
               console.log('Received Data');
               console.log(msg.content.toString());
               var content = (msg.content.toString());
               var data = JSON.parse(msg.content)
               const ticketData = {subject : "Tickets for Your Travel",content :content.toString(), recepientEmail:data.email,status:"PENDING",notification:new Date(+new Date() + 86400000)};
               console.log(data);
               makePdf(data);
               // we will get data from the booking service and create the tickets
               const ticket = await ticketService.create(ticketData);
               channel.ack(msg);
          });
     } catch (error) {
          throw error;
     }

}
const publishMessage = async (channel, binding_key, message) => {
     try {
          await channel.assertQueue('TEMP_QUEUE');
          await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(message));
     } catch (error) {
          throw error;
     }
}

module.exports = {
     subscribeMessage,
     createChannel,
     publishMessage
}