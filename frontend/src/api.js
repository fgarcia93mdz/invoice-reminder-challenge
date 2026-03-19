const API_URL = 'http://localhost:3001';

export async function getInvoices() {
  const response = await fetch(`${API_URL}/invoices`);
  if (!response.ok) {
    throw new Error('Error al obtener las facturas');
  }
  return response.json();
}

export async function getOverdueInvoices() {
  const response = await fetch(`${API_URL}/invoices/overdue`);
  if(!response.ok) {
    throw new Error('Error al obtener las facturas facturas');
  }
  return response.json();
}

export async function sendReminder(invoiceId) {
  const response = await fetch(`${API_URL}/invoices/reminders/${invoiceId}`, {method: "POST"});
  if(!response.ok) {
    throw new Error('Error al enviar recordatorio');
  }
  return response.json();
}

export async function fetchStats() {
  const response = await fetch(`${API_URL}/invoices/stats`);
  if(!response.ok) {
    throw new Error('Error al traer las estadisticas');
  }
  return response.json();
}