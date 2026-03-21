import { useEffect, useState } from 'react';
import { getInvoices } from './api';
import InvoicesList from './components/InvoicesList';

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

      {/* 🔹 Acá usamos el componente */}
      <InvoicesList invoices={invoices} />
    </div>
  );
}

export default App;
