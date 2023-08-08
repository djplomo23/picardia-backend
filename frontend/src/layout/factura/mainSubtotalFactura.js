import React from 'react';

const MainSubtotalFactura = ({ children }) => {
    return (

        <main className="mainSubtotalFactura"><div className="clientesFactura">
            <div className="lineaFactura" style={{marginBottom: "1rem"}}></div>
        </div>{children}</main>

    )
}

export default MainSubtotalFactura;