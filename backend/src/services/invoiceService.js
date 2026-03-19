const { getAllInvoices, saveInvoices } = require('../db/database');

function getAll() {
  return getAllInvoices();
}

//Convierto las fechas a objetos Date para hacer una comparación correcta en lugar de comparar strings.
// actividad 1!!!
function getOverdue() {
  const invoices = getAllInvoices();
  const today = new Date();

  return invoices.filter((invoice) => {
    return (
      invoice.status === 'pending' &&
      new Date(invoice.dueDate) < today
    );
  });
}

// BUG 2: invoiceId llega como string desde req.params,
// pero i.id es number en el JSON → === siempre devuelve false
function getById(invoiceId) {
  const invoices = getAllInvoices();
 return invoices.find(i => i.id === Number(invoiceId)); //convierto invoiceId a number para que la comparación funcione
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
function canSendReminder(invoice) {
  if (invoice.status === 'paid') {
    return false;
  }
  return !invoice.reminderSent;

  

}


function sendReminder(invoiceId) {
  const invoices = getAllInvoices();

  const invoice = invoices.find(i => i.id === Number(invoiceId));


  if (!canSendReminder(invoice)) {
    return null;
  }

  invoice.reminderSent = true;

  saveInvoices(invoices);

  console.log(`Recordatorio enviado a ${invoice.clientName}`);

  return invoice;
}

module.exports = { getAll, getOverdue, getById, create, canSendReminder };
