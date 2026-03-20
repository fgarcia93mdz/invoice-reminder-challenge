const express = require('express');
const router = express.Router();
const { getAllInvoices, createInvoice, getAllOverdue, createReminder, getStats } = require('../controllers/invoicesController');

router.get('/', getAllInvoices);
router.get('/overdue', getAllOverdue);
router.get('/stats', getStats);
router.post('/', createInvoice);
router.post('/reminders/:invoiceId', createReminder);

module.exports = router;
