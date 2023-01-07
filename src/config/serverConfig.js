const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    PORT : process.env.PORT,
    emailId: process.env.USER,
    PASS:process.env.PASS
}