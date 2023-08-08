import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleRight, faUsers } from '@fortawesome/free-solid-svg-icons'


/*const rightSide = () =>{
    document.querySelector('.leftNavLayout').classList.add('rihtSideArrow')
}*/

const LeftNavLayout = () => {
   
    return(
        <nav className="leftNavLayout">
            <Link to={'/#'}><FontAwesomeIcon icon={faArrowAltCircleRight} /></Link>
        </nav>
    )
}

export default LeftNavLayout;