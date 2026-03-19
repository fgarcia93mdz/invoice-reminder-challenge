const express = require('express');
const router = express.Router();
const { getAllOverdueInvoicesController, getAllInvoices, createInvoice } = require('../controllers/index.controller.js');

router.get('/', getAllInvoices);
router.get('/overdue', getAllOverdueInvoicesController);






router.post('/', createInvoice);

module.exports = router;
