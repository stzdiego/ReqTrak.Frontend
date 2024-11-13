// src/Components/RequerimentComponent.jsx
import React from "react";
import styles from "./RequerimentComponent.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faUser, faCalendarAlt, faFlag, faUserTag, faHashtag, faEdit, faBook, faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

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
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const RequerimentComponent = ({ id, createdAt, updatedAt, userCreator, subject, description, stage, priority, userAssigned, onDetailClick }) => {
    return (
        <div className={`card ${styles.cardReq}`}>
            <div className={styles.verticalContainer}>
                <button className={`btn btn-outline-primary ${styles.detailButton}`} onClick={() => onDetailClick(id)}>
                    <FontAwesomeIcon icon={faExternalLinkAlt} />
                </button>
                <div className={styles.verticalSeparator}></div>
            </div>
            <div className={styles.content}>
                <div className="row">
                    <div className="col-md-4 mb-1">
                        <div className="input-group">
                            <OverlayTrigger placement="top" overlay={<Tooltip>ID</Tooltip>}>
                                <span className="input-group-text"><FontAwesomeIcon icon={faHashtag} /></span>
                            </OverlayTrigger>
                            <input type="text" className="form-control" placeholder="ID" aria-label="ID" value={id} readOnly />
                        </div>
                    </div>
                    <div className="col-md-4 mb-1">
                        <div className="input-group">
                            <OverlayTrigger placement="top" overlay={<Tooltip>Creator</Tooltip>}>
                                <span className="input-group-text"><FontAwesomeIcon icon={faUser} /></span>
                            </OverlayTrigger>
                            <input type="text" className="form-control" placeholder="Creator" aria-label="Creator" value={userCreator ? userCreator.name : ''} readOnly />
                        </div>
                    </div>
                    <div className="col-md-4 mb-1">
                        <div className="input-group">
                            <OverlayTrigger placement="top" overlay={<Tooltip>Created At</Tooltip>}>
                                <span className="input-group-text"><FontAwesomeIcon icon={faCalendarAlt} /></span>
                            </OverlayTrigger>
                            <input type="text" className="form-control" placeholder="Created At" aria-label="Created At" value={formatDate(createdAt)} readOnly />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-8 mb-1">
                        <div className="input-group">
                            <OverlayTrigger placement="top" overlay={<Tooltip>Subject</Tooltip>}>
                                <span className="input-group-text"><FontAwesomeIcon icon={faBook} /></span>
                            </OverlayTrigger>
                            <input type="text" className="form-control" placeholder="Subject" aria-label="Subject" value={subject} readOnly />
                        </div>
                    </div>
                    <div className="col-md-4 mb-1">
                        <div className="input-group">
                            <OverlayTrigger placement="top" overlay={<Tooltip>Updated At</Tooltip>}>
                                <span className="input-group-text"><FontAwesomeIcon icon={faEdit} /></span>
                            </OverlayTrigger>
                            <input type="text" className="form-control" placeholder="Updated At" aria-label="Updated At" value={formatDate(updatedAt)} readOnly />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4 mb-1">
                        <div className="input-group">
                            <OverlayTrigger placement="top" overlay={<Tooltip>Stage</Tooltip>}>
                                <span className="input-group-text"><FontAwesomeIcon icon={faLayerGroup} /></span>
                            </OverlayTrigger>
                            <input type="text" className="form-control" placeholder="Stage" aria-label="Stage" value={stageMap[stage]} readOnly />
                        </div>
                    </div>
                    <div className="col-md-4 mb-1">
                        <div className="input-group">
                            <OverlayTrigger placement="top" overlay={<Tooltip>Priority</Tooltip>}>
                                <span className="input-group-text"><FontAwesomeIcon icon={faFlag} /></span>
                            </OverlayTrigger>
                            <input type="text" className="form-control" placeholder="Priority" aria-label="Priority" value={priorityMap[priority]} readOnly />
                        </div>
                    </div>
                    <div className="col-md-4 mb-1">
                        <div className="input-group">
                            <OverlayTrigger placement="top" overlay={<Tooltip>Assigned</Tooltip>}>
                                <span className="input-group-text"><FontAwesomeIcon icon={faUserTag} /></span>
                            </OverlayTrigger>
                            <input type="text" className="form-control" placeholder="Assigned" aria-label="Assigned" value={userAssigned ? userAssigned.name : 'Unassigned'} readOnly />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RequerimentComponent;