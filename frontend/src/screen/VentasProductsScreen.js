import React, { useEffect, useState } from 'react';
import {Link, useHistory} from 'react-router-dom';  
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { addToFactura } from '../actions/facturaAction';







 function VentasProductsScreen(props) {



  const [search, setSearch] = useState('');
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList; 
  const dispatch = useDispatch();


  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  let precios = ''
  let rolex = false
  const role = userInfo.roles

  const [facturaItem, setFacturaItem] = useState('');


  for (let i = 0; i < role.length; i++) {
    if (role[i].name === "affiliate"){
      precios = 0.80;
      rolex = true;

     
    
    }else{
      precios = 0;
      rolex = false
    }
   
}



 
  useEffect(() => {
    
    dispatch(listProducts());

   
    return () => {
    
    };
  }, [])




   async function factura (product)  {

    await dispatch(addToFactura(product._id))

    
  }


  
      return(   

       
        loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          
        <ul className="productsFactura">
          {products.map((product)  => (
            
            <li onClick={() => factura(product)}  key={product._id} >
              <div className="productFactura">
                <Link to={'/'}>
                  <img
                    className="product-imageFactura"
                    src={product.image}
                    alt="product"
                  />
                </Link>
                <div className="product-nameFactura">
                  <Link to={'/' + product._id}>{product.name}</Link> 
                </div>
                <div className="product-category">
                  <Link to={'/' + product.category}>{product.category}</Link>
                </div>
                <div className="product-brandFactura">{product.brand}</div>
                <div className="product-priceFactura" >${rolex ? (precios * product.price ) : product.price }</div>
                <div className="product-rating">
                  {product.qty}
                </div>
                
                
              </div>
            </li>
            
          ))}
        </ul>
        
        
      ) 
       ) }
       
  


 


  


    
export default VentasProductsScreen;