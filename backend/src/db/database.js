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
  const invoices = getAllInvoices();
}

module.exports = { getAllInvoices, saveInvoices };
