// const express = require('express');
import express from 'express';
import { createInvoice, getAllInvoices } from '../controllers/invoicesController.js';

const router = express.Router();
// const { getAllInvoices, createInvoice } = require('../controllers/invoicesController');

router.get('/', getAllInvoices);
router.post('/', createInvoice);

// module.exports = router;
export default router;
