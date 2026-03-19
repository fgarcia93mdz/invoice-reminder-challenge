const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'data.json');

function getAllInvoices() {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify([]));
  }
  const raw = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(raw);
}

function saveInvoices(invoices) {
  fs.writeFileSync(DB_PATH, JSON.stringify(invoices, null, 2));
}

function getAllOverdueInvoices() {
  // devuelva todas las facturas vencidas usando.
// Una factura está vencida cuando cumple ambas condiciones:
// status es "pending"
// dueDate es anterior a la fecha actual
// Respuesta esperada (200):
  const invoices = getAllInvoices();
  console.log('All invoices:', invoices); // Debug: Ver todas las facturas
  const currentDate = new Date();
  return invoices.filter(invoice => 
    invoice.status === "pending" && 
    new Date(invoice.dueDate) < currentDate
  );
}

module.exports = { getAllInvoices, saveInvoices, getAllOverdueInvoices };
