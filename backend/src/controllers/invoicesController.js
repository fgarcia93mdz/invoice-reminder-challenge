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

// Tarea 1 = Endpoint devolviendo facturas vencidas
function isOverdue(invoice) {
  const today = new Date();

  return (
    invoice.status === "pending" &&
    new Date(invoice.dueDate) < today
  );
}

function getInvoicesOverdue(req, res) {
  try {
    const invoices = invoiceService.getAll();
    const overdueInvoices = [];

    for (let i = 0; i < invoices.length; i++) {
      if (isOverdue(invoices[i])) {
        overdueInvoices.push(invoices[i]);
      }
    }

    res.status(200).json(overdueInvoices);

  } catch (error) {
    res.status(500).json({ message: "Error obteniendo facturas vencidas" });
  }
}



module.exports = { getAllInvoices, createInvoice, getInvoicesOverdue };
