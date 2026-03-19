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

function getInvoiceOverdue(req, res) {  
  try {
    //check como llega el invoiceId
    const invoice = invoiceService.getById(req.params.invoiceId);
    console.log(invoice);
    if (invoice) {
      if (invoiceService.getOverdue(invoice)) {
        res.status(200).json({ invoice });
      } else {
        res.status(404).json({ error: 'No hay factura vencida' });
      }
    } else {
      res.status(404).json({ error: 'No existe la factura' });
    } 
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener factura' });
  }
} 


module.exports = { getAllInvoices, createInvoice , getInvoiceOverdue };
