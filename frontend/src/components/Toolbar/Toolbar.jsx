import React from 'react';
import './Toolbar.css';

const Toolbar = ({ onShowAll, onShowOverdue, onOpenCreateModal }) => {
    return (
        <div className="toolbar">
            <button className="toolbar-btn" onClick={onShowAll}>
                Listar Facturas
            </button>

            <button className="toolbar-btn" onClick={onShowOverdue}>
                Listar Vencidas
            </button>

            <button className="toolbar-btn create-btn" onClick={onOpenCreateModal}>
                Agregar Factura
            </button>
        </div>
    );
};

export default Toolbar;