import { useEffect, useState } from 'react';
import { getInvoices, getOverdueInvoices } from './api';

function App() {
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getInvoices()
      .then(setInvoices)
      .catch(err => setError(err.message));
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h1>Invoice Reminder</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Monto</th>
            <th>Vencimiento</th>
            <th>Estado</th>
            <th>Recordatorio enviado</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(inv => (
            <tr key={inv.id}>
              <td>{inv.id}</td>
              <td>{inv.clientName}</td>
              <td>${inv.amount.toLocaleString('es-AR')}</td>
              <td>{inv.dueDate}</td>
              <td>{inv.status}</td>
              <td>{inv.reminderSent ? 'Sí' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
