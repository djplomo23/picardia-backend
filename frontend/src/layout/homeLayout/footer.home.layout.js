import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import logoBlanco from '../../img/LOGO-PICARDIA--BLANCO.png';

const FooterHomeLayout = () => {
    return(
        <footer className="footer">
            <Link to="/" ><img src={logoBlanco} alt="logo" /></Link>
                    <h3>All right reserved.</h3>
        </footer>
    )
}

export default FooterHomeLayout;