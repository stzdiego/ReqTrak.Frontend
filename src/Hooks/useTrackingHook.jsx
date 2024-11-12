import { useState, useEffect } from 'react';
import { ref, onValue, push } from 'firebase/database';
import { database } from '../firebaseConfig';
import TrackingTree from '../Structures/TrackingTree';

const useTrackingHook = (filters) => {
    const [trackingTree, setTrackingTree] = useState(new TrackingTree());
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const tracksRef = ref(database, 'tracks');
        const unsubscribe = onValue(tracksRef, (snapshot) => {
            const data = snapshot.val();
            const newTrackingTree = new TrackingTree();
            const tracks = data ? Object.values(data) : [];

            const reqsToInclude = new Set();
            tracks.forEach(track => {
                if ((!filters.req || track.idReq.toString().includes(filters.req)) &&
                    (!filters.user || track.user.toLowerCase().includes(filters.user.toLowerCase()))) {
                    reqsToInclude.add(track.idReq);
                }
            });

            tracks.forEach(track => {
                if (reqsToInclude.has(track.idReq)) {
                    newTrackingTree.addTrack(track.idReq, track.user, track.date, track.stage, track.description);
                }
            });

            setTrackingTree(newTrackingTree);
            setLoading(false);
        }, (error) => {
            setError(error.message);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [filters]);

    const addTrack = (track) => {
        const tracksRef = ref(database, 'tracks');
        push(tracksRef, track);
    };

    return { trackingTree, addTrack, error, loading };
};

export default useTrackingHook;