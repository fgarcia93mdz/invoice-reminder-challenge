const express = require('express');
const router = express.Router();
const { getAllInvoices, createInvoice, getOverdueInvoices } = require('../controllers/invoicesController');

router.get('/', getAllInvoices);
router.post('/', createInvoice);
//actividad 1!!!
router.get("/overdue", getOverdueInvoices);

module.exports = router;
