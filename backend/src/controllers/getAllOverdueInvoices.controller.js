const { getAllOverdue } = require('../services/invoiceService');

// devuelva todas las facturas vencidas.
// Una factura está vencida cuando cumple ambas condiciones:
// status es "pending"
// dueDate es anterior a la fecha actual
// Respuesta esperada (200):
// [
//   {
//     "id": 1,
//     "clientName": "Empresa ACME",
//     "amount": 120000,
//     "dueDate": "2026-01-20",
//     "status": "pending",
//     "reminderSent": false
//   }
// ]

function getAllOverdueInvoicesController(req, res) {
  try {
    const invoices = invoiceService.getAllOverdue();
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener facturas' });
  }
}



module.exports = { getAllOverdueInvoicesController };
