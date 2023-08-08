import React, { useState, useEffect } from 'react';
import rostro from '../img/rostro.jpg';

function reviewScreen(props) {
    return <div className="reviewScreen">
        <div>
            <h2>Titulo</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetaur adipisicing elit, sed do eiusmod tempor
           </p>
        </div>

        <div className="reviewPerfil">
            <img src={rostro} />
            <h2>Nombre</h2>
            
        </div>


    </div>

}



export default reviewScreen;