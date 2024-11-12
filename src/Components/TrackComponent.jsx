import React from 'react';
import PropTypes from 'prop-types';
import styles from './TrackComponent.module.css';

const TrackComponent = ({ idReq, changes }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);

        if (date.toDateString() === now.toDateString()) {
            return `Today ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        } else if (date.toDateString() === yesterday.toDateString()) {
            return `Yesterday ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        } else {
            return date.toLocaleString();
        }
    };

    return (
        <div className={styles.trackCard}>
            <div className={styles.trackHeader}>
                <span className={styles.trackId}>Req ID: {idReq}</span>
            </div>
            <div className={styles.trackBody}>
                <div className={styles.table}>
                    <div className={styles.tableHeader}>
                        <div>Date</div>
                        <div>Stage</div>
                        <div>Description</div>
                        <div>User</div>
                    </div>
                    {changes.sort((a, b) => new Date(b.date) - new Date(a.date)).map((change, index) => (
                        <div key={index} className={styles.tableRow}>
                            <div>{formatDate(change.date)}</div>
                            <div>{change.stage}</div>
                            <div>{change.description}</div>
                            <div>{change.user}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

TrackComponent.propTypes = {
    idReq: PropTypes.number.isRequired,
    changes: PropTypes.arrayOf(PropTypes.shape({
        date: PropTypes.string.isRequired,
        stage: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        user: PropTypes.string.isRequired,
    })).isRequired,
};

export default TrackComponent;