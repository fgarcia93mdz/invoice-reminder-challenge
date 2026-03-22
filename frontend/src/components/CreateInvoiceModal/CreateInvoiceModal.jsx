import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import './CreateInvoiceModal.css';

const CreateInvoiceModal = ({ show, onHide, onSubmit }) => {
    const [clientName, setClientName] = useState("");
    const [amount, setAmount] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [status, setStatus] = useState("pending");
    const [showConfirm, setShowConfirm] = useState(false);
    const [error, setError] = useState("");

    const handleCreate = (e) => {
        e.preventDefault();
        setError("");

        if (!clientName.trim()) {
            setError("El nombre del cliente es obligatorio");
            return;
        }

        if (!amount || Number(amount) <= 0) {
            setError("El monto debe ser mayor a 0");
            return;
        }

        if (!dueDate) {
            setError("La fecha de vencimiento es obligatoria");
            return;
        }

        setShowConfirm(true);
    };

    const handleConfirm = async () => {
        try {
            await onSubmit({
                clientName: clientName.trim(),
                amount: Number(amount),
                dueDate,
                status,
            });

            setClientName("");
            setAmount("");
            setDueDate("");
            setStatus("pending");
            setShowConfirm(false);
            onHide();
        } catch (err) {
            setError(err.message);
            setShowConfirm(false);
        }
    };

    return (
        <>
            <Modal show={show} onHide={onHide} centered className="create-invoice-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Crear Factura</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form onSubmit={handleCreate}>
                        <div className="mb-3">
                            <label>Cliente</label>
                            <input
                                className="form-control"
                                value={clientName}
                                onChange={(e) => setClientName(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label>Monto</label>
                            <input
                                type="number"
                                className="form-control"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label>Fecha de vencimiento</label>
                            <input
                                type="date"
                                className="form-control"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label>Estado</label>
                            <select
                                className="form-control"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="pending">Pending</option>
                                <option value="paid">Paid</option>
                            </select>
                        </div>

                        {error && <p className="error-text">{error}</p>}

                        <Button type="submit" className="create-btn-modal w-100 mt-2">
                            Crear Factura
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>

            <ConfirmModal
                show={showConfirm}
                onHide={() => setShowConfirm(false)}
                title="Confirmar creación"
                message="¿Crear esta nueva factura?"
                onConfirm={handleConfirm}
            />
        </>
    );
};

export default CreateInvoiceModal;