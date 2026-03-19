const express = require('express');
const router = express.Router();
const { getAllInvoices, createInvoice } = require('../controllers/invoicesController');

router.get('/getAll', getAllInvoices);
router.post('/create', createInvoice);

module.exports = router;
