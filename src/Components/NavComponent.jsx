import logo from '../Images/BrandReqTrak.png';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../Helpers/AuthContext';
import styles from './NavComponent.module.css';

const NavComponent = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <img src={logo} alt="Logo" width="100" className="d-inline-block align-text-top"/>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">About</NavLink>
                        </li>
                        {user && (
                            <>
                                <div className={`vr ${styles.vrPrimary}`}/>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/requeriments">Requeriments</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/tracking">Tracking</NavLink>
                                </li>
                            </>
                        )}
                    </ul>

                    {user ? (
                        <>
                            <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown"
                                       role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {user.displayName}
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                        <li><a className="dropdown-item" href="#">Profile</a></li>
                                        <li>
                                            <hr className="dropdown-divider"/>
                                        </li>
                                        <li>
                                            <button className="dropdown-item" onClick={logout}>Logout</button>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </>
                    ) : (
                        <>
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/login">Login</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/register">Register</NavLink>
                                </li>
                            </ul>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavComponent;