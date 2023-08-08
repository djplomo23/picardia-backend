import React, { useState, useEffect } from 'react';
import offer1 from '../img/Offer1.png';
import esposas from '../img/esposas.png'

function superProductosScreen(props) {
   return <div className="superContainer">
       <div className="imgSuperP">
           <img src={offer1}/>
           <div>
               <h3>Picaro</h3>
               <p>Existen consoladores con un apéndice basal más corto para estimular el clítoris; diseños dobles que se pueden emplear para la penetración vaginal y anal simultáneas; modelos para </p>
           </div>

       </div>
       <div className="descrtionSuper"> 
       <img src={esposas}/>

       </div>


    </div>
  
  }

  

export default superProductosScreen;