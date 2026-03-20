// const invoiceService = require('../services/invoiceService');
import * as invoiceService from '../services/invoiceService.js';

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
function getOverdueInvoices(req, res) {
  try {
    const overdueInvoices = invoiceService.getOverdueInvoices();
    res.status(200).json(overdueInvoices);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener facturas vencidas' });
  }
}

function sendReminder(req, res) {
  try {
    const invoice = invoiceService.sendReminder(req.params.invoiceId);

    if (!invoice) {
      return res.status(404).json({ error: 'No existe la factura' });
    }

    res.status(200).json({
      message: `Recordatorio enviado a ${invoice.clientName}`,
      invoice,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al enviar recordatorio' });
  }
}


export { getAllInvoices, createInvoice ,getOverdueInvoices};
