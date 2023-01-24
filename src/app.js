const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {PORT,REMINDER_BINDING_KEY} = require('./config/serverConfig');
const ApiRoutes = require('./routes/index');
const setupJobs = require('../src/utils/job');
const {subscribeMessage,createChannel}= require('./utils/messageQueue');

const setUpandStartServer=async()=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api', ApiRoutes);

    const channel = await createChannel();
    await subscribeMessage(channel,undefined,REMINDER_BINDING_KEY);

   // setupJobs();
    app.listen(PORT,()=>{
        console.log(`Server started at ${PORT}`)
    });
}

setUpandStartServer();