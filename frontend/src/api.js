const API_URL = 'http://localhost:3001';

export async function getInvoices() {
  const response = await fetch(`${API_URL}/invoices`);
  if (!response.ok) {
    throw new Error('Error al obtener las facturas');
  }
  return response.json();
}
