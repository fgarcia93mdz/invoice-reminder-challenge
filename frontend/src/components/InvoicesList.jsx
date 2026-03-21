import React from 'react'
import { IoIosSend } from "react-icons/io";
import { AiFillDelete } from 'react-icons/ai';

import './InvoicesList.css';

const InvoicesList = ({ invoices }) => {
    return (
        <div className='invoices-table-container'>
            <table className='invoices-table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cliente</th>
                        <th>Monto</th>
                        <th>Vencimiento</th>
                        <th>Estado</th>
                        <th>Recordatorio enviado</th>
                        <th>Enviar Recordatorio</th>
                        <th>Eliminar</th>
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
                            <td>
                                <button className='action-btn send-btn' >
                                    <IoIosSend/>
                                </button>
                            </td>
                            <td>
                                <button className='action-btn delete-btn' >
                                    <AiFillDelete />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default InvoicesList