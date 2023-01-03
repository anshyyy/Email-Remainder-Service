const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    PORT : process.env.PORT,
    emalId: process.env.USER,
    pass:process.env.PASS
}