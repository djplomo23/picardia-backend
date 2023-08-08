import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { categoryProducts } from '../../actions/productActions';


const closeMenu = () => {

    document.querySelector(".sidebar").classList.remove("open");
    document.querySelector(".header").classList.remove("button-ocurto");
    document.querySelector('body').classList.remove("stop");
};

const LeftNavHomeLayout = (props) => {
   



    return (
        <nav className="sidebar">
            <h3>Category</h3>
            <button className="sidebar-close-buttom" onClick={closeMenu}>x</button>

            <ul>
                


            </ul>
        </nav>
    )
}

export default LeftNavHomeLayout;