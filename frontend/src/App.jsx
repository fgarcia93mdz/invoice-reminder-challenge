import { useEffect, useState } from 'react';
import { getInvoices, getOverdueInvoices, sendReminder, fetchStats } from './api';

function App() {
  const [invoices, setInvoices] = useState([]);
  const [overdueInvoices, setOverdueInvoices] = useState([]);
  const [stats, setStats] = useState({});
  const [checkStats, setCheckStats] = useState(false);
  const [check, setCheck] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getInvoices()
      .then(setInvoices)
      .catch(err => setError(err.message));
    
    getOverdueInvoices()
      .then(setOverdueInvoices)
      .catch(err => setError(err.message));
  }, []);

  const updateReminder = (invoiceId) =>
  {
    sendReminder(invoiceId)
      .then((res) => alert(res.message))
      .catch(err => setError(err.message));

    getInvoices()
      .then(setInvoices)
      .catch(err => setError(err.message));
  };

  const getStats = () =>
  {
    setCheckStats(true);

    fetchStats()
      .then(setStats)
      .catch( (err) => setError(err.message) );
  }

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
              <td>{inv.reminderSent ? 'Si' : <> No <button onClick={() => updateReminder(inv.id)}>Enviar recordatorio</button> </>}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button onClick={() => setCheck(true)}>
          Mostrar facturas vencidas
        </button>
        {check &&
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
                  {overdueInvoices.map(inv => (
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
              </table>}
        <button onClick={() => getStats()}>
          Mostrar estadísticas
        </button>
        {checkStats &&
              <table border="1" cellPadding="8" cellSpacing="0">
                <thead>
                  <tr>
                    <th>Total</th>
                    <th>Pendientes</th>
                    <th>Pagadas</th>
                    <th>Vencidas</th>
                  </tr>
                </thead>
                <tbody>
                      <tr key={0}>
                      <td>{stats.total}</td>
                      <td>{stats.pending}</td>
                      <td>{stats.paid}</td>
                      <td>{stats.overdue}</td>
                    </tr>
                </tbody>
              </table>}
      </div>
    </div>
  );
}

export default App;
