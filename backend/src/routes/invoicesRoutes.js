const express = require('express');
const router = express.Router();
const { getAllInvoices, createInvoice, getAllOverdue, createReminder } = require('../controllers/invoicesController');

router.get('/', getAllInvoices);
router.get('/overdue', getAllOverdue);
router.post('/', createInvoice);
router.post('/reminders/:invoiceId', createReminder);

module.exports = router;
