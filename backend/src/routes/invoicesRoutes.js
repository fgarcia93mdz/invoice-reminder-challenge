const express = require('express');
const router = express.Router();
const { getAllInvoices, createInvoice , getInvoiceOverdue} = require('../controllers/invoicesController');

router.get('/getAll', getAllInvoices);
router.post('/create', createInvoice);

router.get('/overdue/:id', getInvoiceOverdue);

module.exports = router;
