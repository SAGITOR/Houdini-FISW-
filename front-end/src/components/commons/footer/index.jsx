import React, { useContext } from 'react';
import './index.scss';
import { AuthContext } from '../../../services';

const Footer = () => {
    const { currentUser } = useContext(AuthContext);
    return (
        <>
            {

                currentUser ?
                    <div className="footer-container">
                        <h3 className="footer-text">All rights reserved</h3>
                    </div>
                    : null
            }
        </>
    );
}

export default Footer;