import React, { useState } from 'react';
import useTrackingHook from '../Hooks/useTrackingHook';
import TrackComponent from '../Components/TrackComponent';
import LoadingComponent from '../Components/LoadingComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './TrackingPage.module.css';

const TrackingPage = () => {
    const [reqFilter, setReqFilter] = useState('');
    const [userFilter, setUserFilter] = useState('');
    const { trackingTree, error, loading } = useTrackingHook({ req: reqFilter, user: userFilter });

    const groupChangesByReq = (node) => {
        if (!node) return [];
        const groupedChanges = {};
        const traverse = (node) => {
            if (!groupedChanges[node.idReq]) {
                groupedChanges[node.idReq] = [];
            }
            groupedChanges[node.idReq].push({
                date: node.date,
                stage: node.stage,
                description: node.description,
                user: node.user,
            });
            node.children.forEach(child => traverse(child));
        };
        traverse(node);
        return Object.entries(groupedChanges).map(([idReq, changes]) => ({ idReq, changes }));
    };

    const groupedTracks = trackingTree.root ? groupChangesByReq(trackingTree.root) : [];

    // Sort groupedTracks by the latest date in each group's changes
    groupedTracks.sort((a, b) => {
        const latestDateA = new Date(a.changes[0].date);
        const latestDateB = new Date(b.changes[0].date);
        return latestDateB - latestDateA;
    });

    return (
        <div className="container mt-2">
            <div className={styles.header}>
                <h1 className={styles.title}>Tracking</h1>
                <p className={styles.description}>
                    This page allows you to track the progress of different requirements. Use the filters to narrow down the results by ID or user.
                </p>
            </div>
            {error && <p>Error: {error}</p>}
            {loading ? (
                <LoadingComponent />
            ) : (
                <>
                    <div className={`card ${styles.filterCard}`}>
                        <div className="card-header">
                            Filters
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <div className="input-group">
                                        <span className="input-group-text">ID</span>
                                        <input
                                            type="text"
                                            value={reqFilter}
                                            onChange={(e) => setReqFilter(e.target.value)}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="input-group">
                                        <span className="input-group-text">User</span>
                                        <input
                                            type="text"
                                            value={userFilter}
                                            onChange={(e) => setUserFilter(e.target.value)}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.container}>
                        <ul className="p-0">
                            {groupedTracks.length > 0 ? groupedTracks.map((group, index) => (
                                <TrackComponent key={index} idReq={Number(group.idReq)} changes={group.changes} />
                            )) : <p>No tracks available</p>}
                        </ul>
                    </div>
                    <div className={styles.statusBar}>
                        {`Total Results: ${groupedTracks.length}`}
                    </div>
                </>
            )}
        </div>
    );
};

export default TrackingPage;