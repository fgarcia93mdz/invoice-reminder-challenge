const express = require('express');
const router = express.Router();
const { getAllInvoices, createInvoice } = require('../controllers/index.controller.js');

router.get('/', getAllInvoices);
// GET /invoices/overdue
// Tarea 1 — GET /invoices/overdue
// Crear un endpoint que devuelva todas las facturas vencidas.
router.get('/overdue', getAllOverdueInvoices);






router.post('/', createInvoice);

module.exports = router;
