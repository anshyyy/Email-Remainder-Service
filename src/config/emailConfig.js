const nodemailer = require('nodemailer');
const {emailId, PASS} = require('./serverConfig');

const sender = nodemailer.createTransport({
    service:'gmail',
    host: 'smtp.gmail.com',
    secure:false,
    auth: {
        user:emailId,
        pass:PASS,
    }
});
module.exports=sender;

