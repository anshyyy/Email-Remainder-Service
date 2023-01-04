const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {PORT} = require('./config/serverConfig');
const ApiRoutes = require('./routes/index');
const setupJobs = require('../src/utils/job');

const setUpandStartServer=()=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api', ApiRoutes);

    
    app.listen(PORT,()=>{
        console.log(`Server started at ${PORT}`)
    });
}

setUpandStartServer();