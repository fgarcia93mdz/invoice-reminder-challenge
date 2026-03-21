// const { getAllInvoices, saveInvoices } = require('../db/database');

import { getAllInvoices, saveInvoices } from '../db/database.js';

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
//actualizo create
function create(data) {
  const invoices = getAllInvoices();

  // chequeo que el campo clientName exista y no este vacio, si no lanzo un error
  if (!data.clientName || !data.clientName.trim()) {
    throw new Error('El campo clientName es obligatorio');
  }

  //chequeo que el monto sea un numero y que sea mayor a 0
  if (typeof data.amount !== 'number' || data.amount <= 0) {
    throw new Error('El campo amount debe ser mayor a 0');
  }

  //chequeo que la fecha exista y que el tipo sea valido
  if (!data.dueDate || isNaN(new Date(data.dueDate).getTime())) {
    throw new Error('El campo dueDate debe ser una fecha válida');
  }

  const newInvoice = {
    id: invoices.length + 1,
    clientName: data.clientName.trim(),
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

// creo la funcion facturas vencidas, filtro las que tienen estado pendiente y la fecha de vencimiento es menor a la fecha actual
function getOverdueInvoicesService() { // cambio de nombre para evitar confusión con el controller
  const invoices = getAllInvoices();
  const today = new Date();

  return invoices.filter(invoice => {
    return (
      invoice.status === 'pending' &&
      new Date(invoice.dueDate) < today
    );
  });
}
//creo la funcion para enviar recordatorio, busco la factura por id, si no existe retorno null, si existe seteo reminderSent a true y  guardo los cambios

function sendReminder(invoiceId) {
  const invoices = getAllInvoices();
  const id = Number(invoiceId);

  const index = invoices.findIndex(invoice => invoice.id === id);

  console.log('valor de index:', index);

  if (index === -1) {
    return null;
  }

  invoices[index].reminderSent = true;

  saveInvoices(invoices);
  console.log(`Recordatorio enviado a ${invoices[index].clientName}`);

  return invoices[index];
}


// module.exports = { getAll, getById, create, canSendReminder };
export { getAll, getById, create, canSendReminder ,getOverdueInvoicesService,sendReminder};
