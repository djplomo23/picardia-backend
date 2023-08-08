import React, { useState, useEffect } from 'react';

function callToActionEmail(props) {
   return <div className="callToActionEmail">
       <label>Suscribete Para Mas Ofertas</label>
       <form>
           
           <input type="email" placeholder="Enter Email Address" />
           <button className=" secondary">Suscribete</button>
       </form>

    </div>
  
  }

  

export default callToActionEmail;