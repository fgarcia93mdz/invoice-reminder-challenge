// saco los require ya que no aplican para es modules // const { getAllInvoices, saveInvoices } = require('./database');

import { getAllInvoices, saveInvoices } from "./database.js";

function seed() {
  const invoices = getAllInvoices();

  if (invoices.length > 0) return;

  const initialData = [
    {
      id: 1,
      clientName: 'Empresa ACME',
      amount: 120000,
      dueDate: '2026-01-20',
      status: 'pending',
      reminderSent: false,
    },
    {
      id: 2,
      clientName: 'Constructora Delta',
      amount: 85000,
      dueDate: '2026-02-15',
      status: 'pending',
      reminderSent: false,
    },
    {
      id: 3,
      clientName: 'Servicios Orion',
      amount: 45000,
      dueDate: '2026-03-20',
      status: 'paid',
      reminderSent: true,
    },
    {
      id: 4,
      clientName: 'Logistica Norte',
      amount: 200000,
      dueDate: '2026-02-28',
      status: 'pending',
      reminderSent: false,
    },
    {
      id: 5,
      clientName: 'Tecnología Sur',
      amount: 67500,
      dueDate: '2026-04-30',
      status: 'pending',
      reminderSent: false,
    },
  ];

  saveInvoices(initialData);
  console.log('Seed ejecutado: 5 facturas cargadas.');
}

export default seed;
