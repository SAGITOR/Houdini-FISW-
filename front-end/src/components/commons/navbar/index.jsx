import React, { useState, useContext } from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../services';

const Navbar = () => {
    const { currentUser } = useContext(AuthContext);
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    //ARREGLAR BOTON CON DIFERENTES DIMENSIONES--
    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

    return (
        currentUser
            ?
            <div className="row">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">

                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className={`navbar-collapse ${isNavCollapsed ? 'hidden' : ''}`} id="navbarToggleExternalContent">
                            <Link className="navbar-brand" to="#" >Hidden brand</Link>
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/dashboard" >Dashboard</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/page2">Page2</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link disabled" to="#" tabIndex="-1" aria-disabled="true">Disabled</Link>
                                </li>
                            </ul>
                            <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                </nav>
            </div>
            : null

    )
}

export default Navbar;