import React, { useState } from 'react';
import { useAuth } from '../Helpers/AuthContext';
import { Modal, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import styles from './ChangePasswordModal.module.css';
import ReauthenticateModal from './ReauthenticateModal';

const ChangePasswordModal = ({ isOpen, onClose }) => {
    const { updatePassword, reauthenticate, user } = useAuth();
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isReauthModalOpen, setIsReauthModalOpen] = useState(false);

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (newPassword !== repeatPassword) {
            setError('Passwords do not match');
            return;
        }
        setLoading(true);
        try {
            await updatePassword(newPassword);
            setLoading(false);
            toast.success('Password changed successfully');
            onClose();
        } catch (error) {
            if (error.code === 'auth/requires-recent-login') {
                setIsReauthModalOpen(true);
            } else {
                setError(error.message);
                setLoading(false);
            }
        }
    };

    const handleReauthenticate = async (password) => {
        try {
            await reauthenticate(user.email, password);
            await updatePassword(newPassword);
            setLoading(false);
            toast.success('Password changed successfully');
            onClose();
        } catch (reauthError) {
            setError(reauthError.message);
            setLoading(false);
        } finally {
            setIsReauthModalOpen(false);
        }
    };

    return (
        <>
            <Modal show={isOpen} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <p className="text-danger">{error}</p>}
                    <Form onSubmit={handleChangePassword}>
                        <Form.Group className="mb-3">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter new password"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Repeat Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={repeatPassword}
                                onChange={(e) => setRepeatPassword(e.target.value)}
                                placeholder="Repeat new password"
                            />
                        </Form.Group>
                        <div className={styles.buttonContainer}>
                            <button type="submit" className={`btn btn-primary ${styles.changePasswordButton}`} disabled={loading}>
                                {loading ? 'Changing...' : 'Change Password'}
                            </button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
            <ReauthenticateModal
                isOpen={isReauthModalOpen}
                onClose={() => setIsReauthModalOpen(false)}
                onReauthenticate={handleReauthenticate}
            />
        </>
    );
};

export default ChangePasswordModal;