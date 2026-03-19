const invoiceService = require('../services/invoiceService');

function getAllInvoices(req, res) {
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

function getAllOverdue(req, res) {
  try {

  } catch (error) {
    
  }
  
}

module.exports = { getAllInvoices, createInvoice };
