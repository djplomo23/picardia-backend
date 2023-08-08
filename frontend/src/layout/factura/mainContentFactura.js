import React from 'react';

const MainContentFactura = ({ children }) => {
    return (

        <main className="mainContentFactura"><div className="clientesFactura">
            <div className="lineaFactura"></div>
            <h2>Factura de consumo</h2>
            <div className="lineaFactura" style={{marginBottom: "1rem"}}></div>
        </div>{children}</main>

    )
}

export default MainContentFactura;