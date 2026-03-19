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
    const thisDate = invoiceService.findOverdue();
    res.status(200).json(thisDate);
  } catch (error) {
    res.status(500).json({ error: 'Error al traer la fecha' });
  }
}

module.exports = { getAllInvoices, createInvoice, getAllOverdue };
