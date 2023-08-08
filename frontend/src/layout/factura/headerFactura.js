import React from 'react';
import logo from '../../img/LOGO-PICARDIA-NEGRO.png'

const HeaderFactura = () => {
    return (
        <header className="headerFactura">
            <div className="titleFactura">
                <img src={logo} alt="Logo" />
                <p>Razón social y nombre comercial</p>
            </div>
            <div>
                <p style={{margin: ".7rem 0 "}}>Dirección</p>
                <p style={{margin: ".7rem 0 "}}>Tel.</p>
                <p style={{margin: ".7rem 0 "}}>RNC:1235764864</p>
                <p style={{margin: ".7rem 0 "}}>RES DGII: 23-2009 DEL 06/ABRIL/2009</p>
                <p style={{textAlign: "center", margin: ".7rem 0 "}}>COMPROBANTE AUTORIZADO POR LA DGII</p>
                <span>19/10/2020 10:28:13</span>
                <span>NCF: BYGHGYVU5899</span>
                <span>NIF: 1658878574</span>
            </div>
            <div style={{fontSize: "1.8rem", margin: "1rem 0"}}>Cliente de Contado</div>
        </header>
    )
}

export default HeaderFactura;