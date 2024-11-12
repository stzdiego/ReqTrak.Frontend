import React from 'react';
import styles from './LoadingComponent.module.css';

const LoadingComponent = () => {
    return (
        <div className={styles.overlay}>
            <div className={styles.loader}></div>
        </div>
    );
};

export default LoadingComponent;