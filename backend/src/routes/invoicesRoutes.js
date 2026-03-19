const express = require('express');

const router = express.Router();
const { getAllInvoices, createInvoice, getInvoicesOverdue, sendReminder} = require('../controllers/invoicesController');

router.get('/', getAllInvoices);
router.post('/', createInvoice);
router.get('/overdue', getInvoicesOverdue);
router.post('/reminder/:invoiceId', sendReminder);

module.exports = router;
