// const { getAllInvoices, saveInvoices } = require('../db/database');

const { getAllInvoices, saveInvoices } = require("../db/database");

function getAll() {
  return getAllInvoices();
}

// BUG 2: invoiceId llega como string desde req.params,
// pero i.id es number en el JSON → === siempre devuelve false
// function getById(invoiceId) {
//   const invoices = getAllInvoices();
//   return invoices.find(i => i.id === invoiceId);
// }

// version corregida de getById conversion a number

function getById(invoiceId) {
  const invoices = getAllInvoices();
  const id = Number(invoiceId);

  return invoices.find(i => i.id === id);
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
// function canSendReminder(invoice) {
//   if (invoice.status = 'paid') {
//     return false;
//   }
//   return !invoice.reminderSent;
// }

//versión corregida de canSendReminder se compara en lugar de asignar el valor 
function canSendReminder(invoice) {
  if (invoice.status === 'paid') {
    return false;
  }
  return !invoice.reminderSent;
}


// module.exports = { getAll, getById, create, canSendReminder };
export { getAll, getById, create, canSendReminder };
