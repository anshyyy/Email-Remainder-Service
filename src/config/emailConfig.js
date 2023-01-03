const nodemailer = require('nodemailer');
const {emailId, pass} = require('./serverConfig');

const sender = nodemailer.createTransport({
    service:'gmail',
    host: 'smtp.gmail.com',
    secure:false,
    auth :{
        user:emailId,
        pass:pass,
    }
});
module.exports=sender;

