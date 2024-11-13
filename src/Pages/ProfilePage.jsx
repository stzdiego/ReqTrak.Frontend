import React, { useState } from 'react';
import { useAuth } from '../Helpers/AuthContext';
import styles from './ProfilePage.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChangePasswordModal from '../Modals/ChangePasswordModal';

const ProfilePage = () => {
    const { user, updateProfile } = useAuth();
    const [displayName, setDisplayName] = useState(user?.displayName || '');
    const [email] = useState(user?.email || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateProfile({ displayName });
            setLoading(false);
            toast.success('Profile updated successfully');
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Profile</h2>
            {error && <p className={styles.error}>{error}</p>}
            <form onSubmit={handleUpdateProfile}>
                <div className="input-group mb-3">
                    <span className="input-group-text"><i className="fas fa-user" /></span>
                    <div className="form-floating">
                        <input
                            type="text"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            className="form-control"
                            id="floatingInputGroup1"
                            placeholder="Name"
                        />
                        <label htmlFor="floatingInputGroup1">Name</label>
                    </div>
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text"><i className="fas fa-envelope" /></span>
                    <div className="form-floating">
                        <input
                            type="email"
                            value={email}
                            className="form-control"
                            id="floatingInputGroup2"
                            placeholder="Email"
                            disabled
                        />
                        <label htmlFor="floatingInputGroup2">Email</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-outline-primary w-100" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Profile'}
                </button>
                <button type="button" className="btn btn-outline-secondary w-100 mt-3" onClick={openModal}>
                    Change Password
                </button>
            </form>
            <ToastContainer />
            <ChangePasswordModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
};

export default ProfilePage;