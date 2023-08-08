import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUsers } from '@fortawesome/free-solid-svg-icons'

const RightNavVentas = () => {
    return(
        <nav className="rightNavVentas">
            <Link to={'/products'}><FontAwesomeIcon icon={faHome} /></Link>
            <Link to={'/users'}><FontAwesomeIcon icon={faUsers} /></Link>
            <Link to={'/products'}><h3>P</h3></Link>
            <Link to={'/users'}><h3>U</h3></Link>
        </nav>
    )
}

export default RightNavVentas;