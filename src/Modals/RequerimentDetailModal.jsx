import React, { useState } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import useTrackingHook from '../Hooks/useTrackingHook';
import { useAuth } from '../Helpers/AuthContext';
import RequerimentHelper from '../Helpers/RequerimentHelper';

const stageMap = {
    '0': 'Pending',
    '1': 'Rejected',
    '2': 'Approved',
    '3': 'Planned',
    '4': 'In Progress',
    '5': 'Done'
};

const RequerimentDetailModal = ({ show, handleClose, requeriment }) => {
    const [newStage, setNewStage] = useState(requeriment.stage);
    const [loading, setLoading] = useState(false);
    const { addTrack } = useTrackingHook({});
    const { user, apiUserId } = useAuth();

    const handleStageChange = (e) => {
        setNewStage(e.target.value);
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            if (!apiUserId) {
                throw new Error('API User ID is null');
            }

            await RequerimentHelper.updateStage(requeriment, newStage, apiUserId, user, addTrack);
        } catch (error) {
            console.error('Error updating stage:', error);
        } finally {
            setLoading(false);
            handleClose();
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Requeriment Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><strong>ID:</strong> {requeriment.id}</p>
                <p><strong>Subject:</strong> {requeriment.subject}</p>
                <p><strong>Current Stage:</strong> {stageMap[requeriment.stage]}</p>
                <Form.Group controlId="stageSelect">
                    <Form.Label>Change Stage</Form.Label>
                    <Form.Control as="select" value={newStage} onChange={handleStageChange}>
                        <option value="0">Pending</option>
                        <option value="1">Rejected</option>
                        <option value="2">Approved</option>
                        <option value="3">Planned</option>
                        <option value="4">In Progress</option>
                        <option value="5">Done</option>
                    </Form.Control>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} disabled={loading}>Close</Button>
                <Button variant="primary" onClick={handleSave} disabled={loading}>
                    {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Save changes'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RequerimentDetailModal;