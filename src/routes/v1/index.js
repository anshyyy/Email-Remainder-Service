const express = require('express');
const ticketController = require('../../controller/ticket-controller');
const router = express.Router();

router.post('/create',ticketController.create);
router.get('/get-ticket',ticketController.get);

module.exports = router;