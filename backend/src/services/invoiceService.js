const { getAllInvoices, saveInvoices } = require('../db/database');

function getAll() {
  return getAllInvoices();
}

// BUG 2: invoiceId llega como string desde req.params,
// pero i.id es number en el JSON → === siempre devuelve false


// fix parseo invoice id porque llega como string
function getById(invoiceId) {
  const invoiceParser = JSON.parse(invoiceId);
  const invoices = getAllInvoices();
  return invoices.find(i => i.id === invoiceParser.id);
}



function create(data) {
  const invoices = getAllInvoices();

  const newInvoice = {
    id: invoices.length + 1,
    clientName: data.clientName,
    amount: data.amount,
    dueDate: data.dueDate,
    status: data.status || 'pending',
    reminderSent: false,
  };

  invoices.push(newInvoice);
  saveInvoices(invoices);
  return newInvoice;
}


// BUG 1: se usa asignación (=) en lugar de comparación (===)
// invoice.status queda seteado a 'paid' → siempre retorna false

//fix cambio de asignacion por comparacion

function candSendReminder(invoice) {
  if(invoice.status === 'paid') {
    return false;
  }
  return !invoice.reminderSent;
}




module.exports = { getAll, getById, create, canSendReminder };
