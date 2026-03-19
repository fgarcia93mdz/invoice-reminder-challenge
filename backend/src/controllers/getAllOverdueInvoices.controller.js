const invoiceService = require('../services/invoiceService');

function getAllOverdueInvoicesController(req, res) {
  try {
    const invoices = invoiceService.getAllOverdue()
    console.log('Overdue invoices:', invoices); // Debug: Ver las facturas vencidas obtenidas
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener facturas' });
  }
}



module.exports = { getAllOverdueInvoicesController };
