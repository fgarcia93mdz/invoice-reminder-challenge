const API_URL = 'http://localhost:3001';

export async function getInvoices() {
  const response = await fetch(`${API_URL}/invoices/getAll`);

  if (!response.ok) {
    throw new Error('Error al obtener las facturas');
  }

  return response.json();
}

export async function getOverdueInvoices() {
  const response = await fetch(`${API_URL}/invoices/overdue`);

  if (!response.ok) {
    throw new Error('Error al obtener las facturas vencidas');
  }

  return response.json();
}

export async function createInvoice(invoiceData) {
  const response = await fetch(`${API_URL}/invoices/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(invoiceData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Error al crear la factura');
  }

  return data;
}

export async function sendReminder(invoiceId) {
  const response = await fetch(`${API_URL}/invoices/${invoiceId}/sendReminder`, {
    method: 'POST',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Error al enviar recordatorio');
  }

  return data;
}