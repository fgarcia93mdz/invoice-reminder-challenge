const invoiceService = require('../services/invoiceService');

function getAllOverdueInvoices(req, res) {
  try {
    const invoices = invoiceService.getAllOverdueInvoices();
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener facturas' });
  }
}



module.exports = { getAllOverdueInvoices };
