import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToFactura, removeFromFactura } from '../actions/facturaAction';






 function FacturaTablaScreen(props) {

   

    let item = [];

    
    
    

    const factura = useSelector(state => state.factura);

    const { facturaItems } = factura;
    //const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
    

   
    const dispatch = useDispatch();
    const removeFromFacturaHandler = (productId) => {
        dispatch(removeFromFactura(productId));
    }
    item = facturaItems;
    console.log(item);

    if(item){
        for (let i=0; i< facturaItems.length; i++){
            for(let i = 0; i< item.length; i++){
                if (item[i].product){
                                        
                    console.log('sii');
             }else{
                 console.log('noo');
             }
                 
            }
              
              
        }
        
    }

   /* if(item.id === facturaItems.id){
        qty = ++qty
    }*/



    useEffect(() => {
        if (item) {
            dispatch(addToFactura(item, ));
        }
        
    }, []);

 //   console.log(item, qty);
    

    const checkoutHandler = () => {
        props.history.push("/signin?redirect=Shipping");
    }
    let subtotal = 0;
    let total = document.querySelectorAll('.precios');

    for (let i = 0; i < total.length; ++i){
        subtotal += parseFloat(total[i].textContent)

    }

  

  
    return (

        <div className="product-listFactura">

            <table className="tableFactura">
                <thead>
                    <tr>
                        <th>CANT.{subtotal}</th>
                        <th>DESCRIPCION</th>
                        <th>ITBIS</th>
                        <th>VALOR</th>
                       
                    </tr>
                    
                </thead>
                <tbody>
                

                    {
                    item.length === 0 ?
                    <div>
                        
                    </div>
                    :
                    item.map(items =>
                        <tr key={items._id}>
                            <td>{items.qty}</td>
                            <td>{items.name}</td>
                            <td>{items.price * 0.18} RD$</td>
                            <td className="precios">{items.price} RD$</td>
                            <button type="button" className="button" onClick={() => removeFromFacturaHandler(items.product)}>
                                            Delete
                                        </button>
                        </tr>)
                    }

                </tbody>
            </table>

        </div>
    );

}

export default FacturaTablaScreen;