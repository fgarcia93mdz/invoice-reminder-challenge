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
    res.status(error.status).json({ error: error.message, code: error.code });
  }
}

function getAllOverdue(req, res) {
  try {
    const overdueInvoices = invoiceService.findOverdue();
    res.status(200).json(overdueInvoices);
  } catch (error) {
    res.status(error.status).json({ error: error.message, code: error.code });
  }
}

function createReminder(req, res) {
  try {
    const { invoiceId } = req.params;
    const createdReminder = invoiceService.sendReminder(invoiceId);
    res.status(200).json(createdReminder);
  } catch (error) {
    res.status(error.status).json({ error: error.message, code: error.code });
  }
}

function getStats(req, res) {
  try {
    const fetchedStats = invoiceService.fetchStats();
    res.status(200).json(fetchedStats);
  } catch(error) {
    res.status(error.status).json({ error: error.message, code: error.code });
  }
}

module.exports = { getAllInvoices, createInvoice, getAllOverdue, createReminder, getStats };
