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

// Corregido
// También podíamos hacer parseInt(invoiceId) pero entendí
// que el foco era en la diferencia entre igualdad débil y estricta
function getById(invoiceId) {
  const invoices = getAllInvoices();
  return invoices.find(i => i.id == invoiceId);
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

  return invoices.filter( invoice =>
  {
    const thisInvoiceDate = splitDate(invoice.dueDate);
    if(trimmedDate.year > thisInvoiceDate.year
      || trimmedDate.month > thisInvoiceDate.month
      || trimmedDate.day > thisInvoiceDate.day)
    {
      return invoice
    }
  } );
}

// Corregido
// Cambiada la asignación por la igualdad (estricta)
function canSendReminder(invoice) {
  if (invoice.status === 'paid') {
    return false;
  }
  return !invoice.reminderSent;
}

function sendReminder(invoiceId) {
  const thisInvoice = getById(invoiceId);
  if(!thisInvoice) throw new Error ('Factura no encontrada');
  if(thisInvoice.reminderSent) throw new Error ('Recordatorio previamente enviado');

  thisInvoice.reminderSent = true;

  const allInvoices = getAll();

  let newInvoices = allInvoices.map( invoice => invoice.id == thisInvoice.id
  ? thisInvoice
  : invoice );
  
  saveInvoices(newInvoices);

  return { 'message': `Recordatorio enviado a ${thisInvoice.clientName}`, "invoice": thisInvoice };
}

module.exports = { getAll, getById, create, canSendReminder, findOverdue, sendReminder };
