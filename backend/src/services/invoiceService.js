const { getAllInvoices, saveInvoices } = require('../db/database');

function getAll() {
  return getAllInvoices();
}

function splitDate(date) {
  const trimmedDate = date.slice(0,10).split('-');

  const year = trimmedDate[0];
  const month = trimmedDate[1];
  const day = trimmedDate[2];

  return { year, month, day }; 
}

// BUG 2: invoiceId llega como string desde req.params,
// pero i.id es number en el JSON → === siempre devuelve false
function getById(invoiceId) {
  const invoices = getAllInvoices();
  return invoices.find(i => i.id === invoiceId);
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

function findOverdue() {
  const invoices = getAllInvoices();
  const thisDate = new Date();

  const trimmedDate = splitDate(thisDate.toISOString());

  const firstInvoiceDate = splitDate(invoices[0].dueDate);

  let dueInvoices = [];

  if(trimmedDate.year > firstInvoiceDate.year || trimmedDate.month > firstInvoiceDate.month || trimmedDate.day > firstInvoiceDate.day )
  {
    dueInvoices.push( invoices[0] );
  }
  
  return { dueInvoices };
}

// BUG 1: se usa asignación (=) en lugar de comparación (===)
// invoice.status queda seteado a 'paid' → siempre retorna false
function canSendReminder(invoice) {
  if (invoice.status = 'paid') {
    return false;
  }
  return !invoice.reminderSent;
}

module.exports = { getAll, getById, create, canSendReminder, findOverdue };
