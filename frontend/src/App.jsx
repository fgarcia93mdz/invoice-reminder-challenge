import { useEffect, useState } from 'react';
import {getInvoices,getOverdueInvoices,createInvoice,sendReminder} from './api.js';
import Toolbar from './components/Toolbar/Toolbar.jsx';
import InvoicesList from './components/InvoicesList/InvoicesList.jsx';
import CreateInvoiceModal from './components/CreateInvoiceModal/CreateInvoiceModal.jsx';


function App() {
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentFilter, setCurrentFilter] = useState('all');

  async function loadAllInvoices() {
    try {
      setError(null);
      const data = await getInvoices();
      setInvoices(data);
      setCurrentFilter('all');
    } catch (err) {
      setError(err.message);
    }
  }

  async function loadOverdueInvoices() {
    try {
      setError(null);
      const data = await getOverdueInvoices();
      setInvoices(data);
      setCurrentFilter('overdue');
    } catch (err) {
      setError(err.message);
    }
  }

  async function refreshCurrentView() {
    if (currentFilter === 'overdue') {
      await loadOverdueInvoices();
    } else {
      await loadAllInvoices();
    }
  }

  async function handleCreateInvoice(invoiceData) {
    try {
      setError(null);
      await createInvoice(invoiceData);
      await refreshCurrentView();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }

  async function handleSendReminder(invoiceId) {
    try {
      setError(null);
      await sendReminder(invoiceId);
      await refreshCurrentView();
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    loadAllInvoices();
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h1 style={{ color: 'red' }}>Invoice Reminder</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <Toolbar
        onShowAll={loadAllInvoices}
        onShowOverdue={loadOverdueInvoices}
        onOpenCreateModal={() => setShowCreateModal(true)}
      />

      <InvoicesList
        invoices={invoices}
        onSendReminder={handleSendReminder}
      />

      <CreateInvoiceModal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        onSubmit={handleCreateInvoice}
      />
    </div>
  );
}

export default App;