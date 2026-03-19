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
    const overdueInvoices = invoiceService.findOverdue();
    res.status(200).json(overdueInvoices);
  } catch (error) {
    res.status(500).json({ error: 'Error al traer la fecha' });
  }
}

function createReminder(req, res) {
  try
  {
    const { invoiceId } = req.params;
    const createdReminder = invoiceService.sendReminder(invoiceId);
    res.status(200).json(createdReminder);
  } catch (error) {
    res.status(500).json({ error: 'Error creando recordatorio' });
  }
}

module.exports = { getAllInvoices, createInvoice, getAllOverdue, createReminder };
