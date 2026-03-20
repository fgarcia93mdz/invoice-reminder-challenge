// const express = require('express');
import express from 'express';
import { createInvoice, getAllInvoices } from '../controllers/invoicesController.js';
import { getOverdueInvoices, sendReminder } from '../services/invoiceService.js';

const router = express.Router();
// const { getAllInvoices, createInvoice } = require('../controllers/invoicesController');

router.get('/getAll', getAllInvoices);
router.post('/create', createInvoice);
router.get('/overdue', getOverdueInvoices);
router.post('/:invoiceId/sendReminder',sendReminder)


// module.exports = router;
export default router;
