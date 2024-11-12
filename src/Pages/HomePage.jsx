import React from 'react';
import imgHome from '../Images/tracking_home.svg';
import styles from './HomePage.module.css';

const HomePage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.hstack}>
                <div>
                    <p className={styles.title}>Monitor your team's requirements and be more productive.</p>
                    <p className={styles.text}>With ReqTrak, stay on top of the progress of each requirement in real time. Instantly view the history and updates of each task, allowing detailed tracking at every stage. Ensure deadlines are met, improve your team's productivity and provide fast and accurate responses to your customers.</p>
                </div>
                <div>
                    <img className={styles.imgHome} src={imgHome} alt="Home" />
                </div>
            </div>
        </div>
    );
}

export default HomePage;