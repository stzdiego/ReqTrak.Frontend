import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ReauthenticateModal = ({ isOpen, onClose, onReauthenticate }) => {
    const [password, setPassword] = useState('');

    const handleReauthenticate = (e) => {
        e.preventDefault();
        onReauthenticate(password);
    };

    return (
        <Modal show={isOpen} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Reauthenticate</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleReauthenticate}>
                    <Form.Group className="mb-3">
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter current password"
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Reauthenticate
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ReauthenticateModal;