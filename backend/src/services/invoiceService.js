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

function isValidDate(date) {
  return date instanceof Date && !isNaN(date);
}

function create(data) {
  const invoices = getAllInvoices();

  if(!data.clientName) throw Object.assign(
  new Error('El nombre del cliente es obligatorio'),
    {
      status: 400,
      code: "CLIENT_NAME_NOT_FOUND",
      timestamp: new Date().toISOString()
    } );

  if(data.amount<=0) throw Object.assign(new Error('El monto debe ser superior a cero'),
    {
      status: 400,
      code: "INVALID_AMMOUNT",
      timestamp: new Date().toISOString()
    } );

  if(!isValidDate(data.dueDate)) throw Object.assign(new Error('Formato de fecha para plazo inválido'),
    {
      status: 400,
      code: "INVALID_DATE_FORMAT",
      timestamp: new Date().toISOString()
    } );

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
  if(!thisInvoice) throw new Object.assign(Error ('Factura no encontrada'),
    {
      status: 404,
      code: "INVOICE_NOT_FOUND",
      timestamp: new Date().toISOString()
    } );

  if(thisInvoice.reminderSent) throw new Object.assign(Error ('Recordatorio previamente enviado'),
    {
      status: 409,
      code: "REMINDER_ALREADY_SENT",
      timestamp: new Date().toISOString()
    } );

  thisInvoice.reminderSent = true;

  const allInvoices = getAll();

  let newInvoices = allInvoices.map( invoice => invoice.id == thisInvoice.id
  ? thisInvoice
  : invoice );
  
  saveInvoices(newInvoices);

  return { 'message': `Recordatorio enviado a ${thisInvoice.clientName}`, "invoice": thisInvoice };
}

module.exports = { getAll, getById, create, canSendReminder, findOverdue, sendReminder };
