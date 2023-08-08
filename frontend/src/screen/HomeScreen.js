import React, { useEffect, useState } from 'react';
import Product from '../Components/Product';
import LoadingBox from '../Components/LoadingBox';
import MessageBox from '../Components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { listOffers } from '../actions/offerActions'


export default function HomeScreen() {

  const [productosAll, setProductosAll] = useState()
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productMeGusta = useSelector((state) => state.productMeGusta);
  const { meGustas } = productMeGusta;

  const productos = products?.filter((product) => 
    product.images.length > 0 && product
    //product.images < 0 && product
  )

  console.log(productos)

  useEffect(() => {
    setProductosAll(productos)
  }, [products]);


  useEffect(() => {
    dispatch(listProducts({}));
    dispatch(listOffers({}));
  }, [dispatch, meGustas]);

  return (
    <div>
        
      
      <h2>Productos Destacados</h2>
      {loading  ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
          <div className="row center">
            {productosAll?.map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
          </div>
        </>
      )}
    </div>
  );
}