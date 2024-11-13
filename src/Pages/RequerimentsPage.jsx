import React, { useState, useEffect } from "react";
import RequerimentComponent from "../Components/RequerimentComponent";
import RequerimentDetailModal from "../Modals/RequerimentDetailModal";
import styles from "./RequerimentsPage.module.css";
import useFetchRequerimentsHook from "../Hooks/useFetchRequerimentsHook";
import LoadingComponent from "../Components/LoadingComponent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync, faTimes } from '@fortawesome/free-solid-svg-icons';
import apiConfig from '../apiConfig';

const RequerimentsPage = () => {
    const [filters, setFilters] = useState({
        id: '',
        subject: '',
        stage: -1,
        priority: -1,
    });
    const [debouncedFilters, setDebouncedFilters] = useState(filters);
    const [selectedRequeriment, setSelectedRequeriment] = useState(null);
    const endpoint = `${apiConfig.baseUrl}/Requeriments/filter`;
    const { data: requeriments, isLoading, error } = useFetchRequerimentsHook(endpoint, debouncedFilters);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedFilters(filters);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [filters]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: name === 'id' ? parseInt(value, 10) || '' :
                (name === 'stage' || name === 'priority') ? parseInt(value, 10) : value,
        }));
    };

    const handleClear = () => {
        setFilters({
            id: '',
            subject: '',
            stage: -1,
            priority: -1,
        });
    };

    const handleRefresh = () => {
        setDebouncedFilters({ ...filters });
    };

    const handleDetailClick = (id) => {
        const requeriment = requeriments.find(req => req.id === id);
        setSelectedRequeriment(requeriment);
    };

    const handleCloseModal = () => {
        setSelectedRequeriment(null);
    };

    if (isLoading) return <LoadingComponent />;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mt-2">
            <div className={styles.header}>
                <h1 className={styles.title}>Requeriments</h1>
                <p className={styles.description}>
                    This page allows you to manage and view different requirements. Use the filters to narrow down the results by ID, subject, stage, or priority.
                </p>
            </div>
            <div className={`card ${styles.filterCard}`}>
                <div className="card-header">
                    Filtros
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-3 mb-3">
                            <div className="input-group">
                                <span className="input-group-text">ID</span>
                                <input
                                    type="text"
                                    name="id"
                                    value={filters.id}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <div className="input-group">
                                <span className="input-group-text">Subject</span>
                                <input
                                    type="text"
                                    name="subject"
                                    value={filters.subject}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <div className="input-group">
                                <span className="input-group-text">Stage</span>
                                <select
                                    name="stage"
                                    value={filters.stage}
                                    onChange={handleInputChange}
                                    className="form-select"
                                >
                                    <option value="-1" disabled>Stage</option>
                                    <option value="0">Pending</option>
                                    <option value="1">Rejected</option>
                                    <option value="2">Approved</option>
                                    <option value="3">Planned</option>
                                    <option value="4">In Progress</option>
                                    <option value="5">Done</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <div className="input-group">
                                <span className="input-group-text">Priority</span>
                                <select
                                    name="priority"
                                    value={filters.priority}
                                    onChange={handleInputChange}
                                    className="form-select"
                                >
                                    <option value="-1" disabled>Priority</option>
                                    <option value="0">Low</option>
                                    <option value="1">Medium</option>
                                    <option value="2">High</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-end">
                        <div className="col-auto">
                            <button type="button" className="btn btn-secondary" onClick={handleClear}>
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>
                        <div className="col-auto">
                            <button type="button" className="btn btn-primary" onClick={handleRefresh}>
                                <FontAwesomeIcon icon={faSync} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.container}>
                <div className="p-0">
                    {requeriments.map((requeriment, index) => (
                        <div key={index}>
                            <RequerimentComponent {...requeriment} onDetailClick={handleDetailClick} />
                        </div>
                    ))}
                </div>
            </div>
            {selectedRequeriment && (
                <RequerimentDetailModal
                    show={!!selectedRequeriment}
                    handleClose={handleCloseModal}
                    requeriment={selectedRequeriment}
                />
            )}
            <div className={styles.statusBar}>
                {`Total Results: ${requeriments.length}`}
            </div>
        </div>
    );
}

export default RequerimentsPage;