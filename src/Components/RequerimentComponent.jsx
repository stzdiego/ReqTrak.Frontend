import React from "react";
import styles from "./RequerimentComponent.module.css";

const RequerimentComponent = ({ id, creationDate, userCreator, subject, description, stage, priority, userAssigned }) => {
    return (
        <div className={`card ${styles.cardReq}`}>
            <div className={styles.verticalLine}></div>
            <div className={styles.content}>
                <div className={styles.row}>
                    <div className="input-group me-3 mb-1">
                        <span className="input-group-text">Id</span>
                        <input type="text" className="form-control" placeholder="Id" aria-label="Id" value={id}
                               readOnly="true"/>
                    </div>
                    <div className="input-group me-3 mb-1">
                        <span className="input-group-text">Creator</span>
                        <input type="text" className="form-control" placeholder="Id" aria-label="Id" value={userCreator}
                               readOnly="true"/>
                    </div>
                    <div className="input-group me-3 mb-1">
                        <span className="input-group-text">Date</span>
                        <input type="text" className="form-control" placeholder="Id" aria-label="Id" value={creationDate}
                               readOnly="true"/>
                    </div>
                </div>

                <div className="form-floating me-3 mb-1">
                    <input className="form-control" placeholder="Subject" readOnly="true" value={subject}></input>
                    <label>Subject</label>
                </div>

                <div className="form-floating me-3 mb-1">
                    <textarea className="form-control" placeholder="Subject" readOnly="true"
                              value={description}></textarea>
                    <label>Description</label>
                </div>

                <div className={styles.row}>
                    <div className="input-group me-3 mb-1">
                        <span className="input-group-text">Stage</span>
                        <input type="text" className="form-control" placeholder="Id" aria-label="Id" value={stage}
                               readOnly="true" />
                    </div>
                    <div className="input-group me-3 mb-1">
                        <span className="input-group-text">Priority</span>
                        <input type="text" className="form-control" placeholder="Id" aria-label="Id" value={priority}
                               readOnly="true"/>
                    </div>
                    <div className="input-group me-3 mb-1">
                        <span className="input-group-text">Assigned</span>
                        <input type="text" className="form-control" placeholder="Id" aria-label="Id" value={userAssigned}
                               readOnly="true"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RequerimentComponent;