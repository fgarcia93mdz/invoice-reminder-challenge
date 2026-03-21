// const invoiceService = require('../services/invoiceService');
import * as invoiceService from '../services/invoiceService.js';

function getAllInvoices(req, res) {
  try {
    const invoices = invoiceService.getAll();
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener facturas' });
  }
}

function createInvoice(req, res) {
  try {
    const invoice = invoiceService.create(req.body);
    res.status(201).json(invoice);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
function getOverdueInvoices(req, res) {
  console.log('entró al controller overdue');
  try {
    const overdueInvoices = invoiceService.getOverdueInvoicesService();
    res.status(200).json(overdueInvoices);
  } catch (error) {
    console.error(error);
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


export { getAllInvoices, createInvoice ,getOverdueInvoices,sendReminder};
