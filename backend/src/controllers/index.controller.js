const { getAllInvoices, createInvoice } = require('./invoicesController');
const { getAllOverdueInvoices } = require('./getAllOverdueInvoices.controller');

module.exports = { getAllInvoices, getAllOverdueInvoices, createInvoice };