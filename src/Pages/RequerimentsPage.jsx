import React, { useState, useEffect } from "react";
import RequerimentComponent from "../Components/RequerimentComponent";
import styles from "./RequerimentsPage.module.css";
import useFetchRequerimentsHook from "../Hooks/useFetchRequerimentsHook";
import LoadingComponent from "../Components/LoadingComponent";

const RequerimentsPage = () => {
    const [filters, setFilters] = useState({
        subject: '',
        stage: -1,
        priority: -1,
    });
    const [debouncedFilters, setDebouncedFilters] = useState(filters);
    const endpoint = 'http://localhost:5113/Requeriments/filter';
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
            [name]: name === 'subject' ? value : (value === '-1' ? '' : parseInt(value, 10)),
        }));
    };

    const handleClear = () => {
        setFilters({
            subject: '',
            stage: -1,
            priority: -1,
        });
    };

    const handleRefresh = () => {
        setFilters({ ...filters });
    };

    if (isLoading) return <LoadingComponent />;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mt-2">
            <div className="card mb-2">
                <span className="card-body">
                    <h5 className="card-title">Filters</h5>

                    <div className="row">
                        <div className="col">
                            <input type="text"
                                   className="form-control"
                                   placeholder="Subject"
                                   name="subject"
                                   value={filters.subject}
                                   onChange={handleInputChange}
                            />
                        </div>
                        <div className="col">
                            <select className="form-select"
                                    name="stage"
                                    value={filters.stage}
                                    onChange={handleInputChange}
                            >
                                <option value="-1" disabled selected>Stage</option>
                                <option value="0">Pending</option>
                                <option value="1">Rejected</option>
                                <option value="2">Approved</option>
                                <option value="3">Planned</option>
                                <option value="4">In Progress</option>
                                <option value="5">Done</option>
                            </select>
                        </div>
                        <div className="col">
                            <select className="form-select"
                                    name="priority"
                                    value={filters.priority}
                                    onChange={handleInputChange}
                            >
                                <option value="-1" disabled selected>Priority</option>
                                <option value="0">Low</option>
                                <option value="1">Medium</option>
                                <option value="2">High</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mt-2 justify-content-end">
                        <div className="col-auto">
                            <button type="button"
                                    className="btn btn-secondary w-100"
                                    onClick={handleClear}
                            >Clear</button>
                        </div>
                        <div className="col-auto">
                            <button type="button"
                                    className="btn btn-primary w-100"
                                    onClick={handleRefresh}
                            >Refresh</button>
                        </div>
                    </div>

                </span>
            </div>

            <div className={styles.container}>
                <ul className="p-0">
                    {requeriments.map((requeriment, index) => (
                        <RequerimentComponent key={index} {...requeriment} />
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default RequerimentsPage;