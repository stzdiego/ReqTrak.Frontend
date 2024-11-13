// src/Hooks/useFetchRequerimentsHook.jsx
import { useState, useEffect } from 'react';

const useFetchRequerimentsHook = (url, filters) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // Ensure id is null if it's an empty string
                const adjustedFilters = {
                    ...filters,
                    id: filters.id === '' ? null : filters.id
                };

                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(adjustedFilters),
                });
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Error fetching data: ${response.status} ${response.statusText} - ${errorText}`);
                }
                const result = await response.json();

                // Sort the data
                const sortedData = result.sort((a, b) => {
                    const dateA = new Date(a.updatedAt || a.createdAt);
                    const dateB = new Date(b.updatedAt || b.createdAt);
                    return dateB - dateA;
                });

                setData(sortedData);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url, filters]);

    return { data, isLoading, error };
};

export default useFetchRequerimentsHook;