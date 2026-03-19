const express = require('express');
const router = express.Router();
const { getAllInvoices, createInvoice, getAllOverdue } = require('../controllers/invoicesController');

router.get('/', getAllInvoices);
router.get('/date', getAllOverdue);
router.post('/', createInvoice);

module.exports = router;
