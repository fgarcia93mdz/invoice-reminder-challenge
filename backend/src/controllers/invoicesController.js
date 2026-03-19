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

const getOverdueInvoices = (req, res) => {
  try {
    const overdue = invoiceService.getOverdue();

    res.status(200).json(overdue);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener facturas vencidas" });
  }
};


module.exports = { getAllInvoices, createInvoice, getOverdueInvoices };
