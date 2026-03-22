import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './ConfirmModal.css';

const ConfirmModal = ({ show, onHide, title, message, onConfirm }) => {
    return (
        <Modal show={show} onHide={onHide} centered className="confirm-modal">
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>{message}</p>
            </Modal.Body>

            <Modal.Footer>
                <Button className="cancel-btn" onClick={onHide}>
                    Cancelar
                </Button>
                <Button className="confirm-btn" onClick={onConfirm}>
                    Confirmar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmModal;