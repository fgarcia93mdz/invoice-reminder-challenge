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

// Tarea 2 = Enviar recordatorio de pago
function sendReminder(req, res) {
  try {
    const { invoiceId } = req.params;
    const invoice = invoiceService.getById(invoiceId);

    // verificar que exista la factura
    if (!invoice) {
      return res.status(404).json({ 
        message: "Factura no encontrada" 
      });
    }

    // Marcar reminderSent = true en la factura
    if (!invoiceService.canSendReminder(invoice)) {
      return res.status(400).json({
        message: "No se puede enviar recordatorio"
      });
    }

    // Simular el envío con un console.log
    invoice.reminderSent = true;
    const invoices = invoiceService.getAll();
    saveInvoices(invoices); 

    console.log(`Recordatorio enviado a ${invoice.clientName}`);

    res.status(200).json({
      message: `Recordatorio enviado a ${invoice.clientName}`,
      invoice
    });

  } catch (error) {
    res.status(500).json({ 
      message: "Error enviando recordatorio" 
    });
  }
}

module.exports = { getAllInvoices, createInvoice, getInvoicesOverdue, sendReminder };
