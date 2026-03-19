const invoiceService = require('../services/invoiceService');

function getAllOverdueInvoices(req, res) {
  try {
    const invoices = invoiceService.getAll();
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener facturas' });
  }
}

function createInvoice(req, res) {
  try {
    const invoice = invoiceService.create(req.body);
    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear factura' });
  }
}

module.exports = { getAllOverdueInvoices, createInvoice };
