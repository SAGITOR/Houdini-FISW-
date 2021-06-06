import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../services';
import './index.scss';

const Sidebar = () => {
    const { currentUser } = useContext(AuthContext);
    const [isSideBarCollapsed, setIsNavCollapsed] = useState(false);
    //ARREGLAR BOTON CON DIFERENTES DIMENSIONES--

    const handleNavCollapse = () => setIsNavCollapsed(!isSideBarCollapsed);
    
    return (
        currentUser
            ?
            <div className = {`col-2 ${isSideBarCollapsed ? 'close' : 'open'}`} id = "sidebarToggleExternalContent">

                <nav className =  "sidenav">
                    <div className = "navbar-collapse">

                        <ul className = "list-unstyled components">

                            <li className="nav-item">
                                <Link className = "nav-link active" to="#" >
                                    <i className = "fas fa-fire fa-lg sidebar-icon"/>
                                    <span className = "span-header">NameOfPage</span>
                                </Link>
                            </li>
                            <hr className = "sidebar-divider my-4" />

                            <li className="nav-item">
                                <Link className = "nav-link active" aria-current="page" to="/dashboard" >
                                    <i className = "fas fa-home fa-lg sidebar-icon" />
                                    <span>Dashboard</span>
                                </Link>
                            </li>
                            <hr className = "sidebar-divider my-2" />
                            
                            <div className = "sidebar-heading">
                                Pages
                            </div>
                            <li className = "nav-item">
                                <Link className="nav-link active" to="/myconversations">
                                    <i className = "fas fa-comments fa-lg sidebar-icon" />
                                    <span>My Conversations</span>
                                </Link>
                            </li>
                            <hr className = "sidebar-divider my-2" />

                            <div className = "sidebar-heading">
                                Applications
                            </div>
                            <li className = "nav-item">
                                <Link className="nav-link active" to="/profile">
                                    <i className = "fas fa-cubes fa-lg sidebar-icon" />
                                    <span>make dropbar</span>
                                </Link>
                            </li>
                            <hr className = "sidebar-divider my-2" />

                            <div className = "sidebar-heading">
                                User
                            </div>
                            <li className = "nav-item">
                                <Link className="nav-link active" to="/profile">
                                    <i className = "fas fa-user-circle fa-lg sidebar-icon" />
                                    <span>Profile</span>
                                </Link>
                            </li>
                            <hr className = "sidebar-divider my-2" />

                            <li className = "nav-item">
                                <Link className = "nav-link disabled" to="#" tabIndex="-1" aria-disabled="true">
                                    <i className = "fas fa-paper-plane fa-lg sidebar-icon" />
                                    <span>Disabled</span>  
                                </Link>
                            </li>
                            <hr className = "sidebar-divider my-2" />

                        </ul>

                    </div>
                    <button  type="button"  className = "btn btn-secondary" id = "button-side-bar" data-bs-toggle="collapse" data-bs-target="#sidebarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded={!isSideBarCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
                        <i className = {`fas fa-caret-left ${isSideBarCollapsed ? 'rotate-icon' : ''}`} ></i>
                    </button>

                </nav>
            </div>
            : null

    )
}

export default Sidebar;