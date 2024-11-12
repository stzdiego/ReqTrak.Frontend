import React from "react";
import styles from "./RequerimentComponent.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faUser, faCalendarAlt, faFlag, faUserTag, faHashtag } from '@fortawesome/free-solid-svg-icons';

const priorityMap = {
    '-1': 'None',
    '0': 'Low',
    '1': 'Medium',
    '2': 'High'
};

const stageMap = {
    '-1': 'None',
    '0': 'Pending',
    '1': 'Rejected',
    '2': 'Approved',
    '3': 'Planned',
    '4': 'InProgress',
    '6': 'Done'
};

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const RequerimentComponent = ({ id, createdAt, userCreator, subject, description, stage, priority, userAssigned, onDetailClick }) => {
    return (
        <div className={`card ${styles.cardReq}`}>
            <div className={styles.verticalContainer}>
                <button className={`btn btn-outline-primary ${styles.detailButton}`} onClick={() => onDetailClick(id)}>
                    <FontAwesomeIcon icon={faExternalLinkAlt} />
                </button>
                <div className={styles.verticalSeparator}></div>
            </div>
            <div className={styles.content}>
                <div className={styles.row}>
                    <div className="input-group me-3 mb-1">
                        <span className="input-group-text"><FontAwesomeIcon icon={faHashtag} /></span>
                        <input type="text" className="form-control" placeholder="ID" aria-label="ID" value={id} readOnly />
                    </div>
                    <div className="input-group me-3 mb-1">
                        <span className="input-group-text"><FontAwesomeIcon icon={faUser} /></span>
                        <input type="text" className="form-control" placeholder="Creator" aria-label="Creator" value={userCreator ? userCreator.name : ''} readOnly />
                    </div>
                    <div className="input-group me-3 mb-1">
                        <span className="input-group-text"><FontAwesomeIcon icon={faCalendarAlt} /></span>
                        <input type="text" className="form-control" placeholder="Date" aria-label="Date" value={formatDate(createdAt)} readOnly />
                    </div>
                </div>

                <div className="form-floating me-3 mb-1">
                    <input className="form-control" placeholder="Subject" readOnly value={subject}></input>
                    <label>Subject</label>
                </div>

                <div className={styles.row}>
                    <div className="input-group me-3 mb-1">
                        <span className="input-group-text"><FontAwesomeIcon icon={faFlag} /></span>
                        <input type="text" className="form-control" placeholder="Stage" aria-label="Stage" value={stageMap[stage]} readOnly />
                    </div>
                    <div className="input-group me-3 mb-1">
                        <span className="input-group-text"><FontAwesomeIcon icon={faFlag} /></span>
                        <input type="text" className="form-control" placeholder="Priority" aria-label="Priority" value={priorityMap[priority]} readOnly />
                    </div>
                    <div className="input-group me-3 mb-1">
                        <span className="input-group-text"><FontAwesomeIcon icon={faUserTag} /></span>
                        <input type="text" className="form-control" placeholder="Assigned" aria-label="Assigned" value={userAssigned ? userAssigned.name : 'Unassigned'} readOnly />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RequerimentComponent;