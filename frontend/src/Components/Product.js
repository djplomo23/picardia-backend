
import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import AfiliadosPrecio from './AfiliadosPrecio'
import {OFFERS_AFILIADOS} from '../constants/offerConstants'
import { useDispatch, useSelector } from 'react-redux';
import { meGustaProduct } from '../actions/productActions';

export default function Product(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  

  const { product } = props;
  let colorText = product.meGustas?.length > 0 ? 'text-danger' : 'text-dark'

  const dispatch = useDispatch()

  const meGustaHandle = (product) => {
    
    const id = product._id
    const userId = userInfo._id
    const idMegustas = product.meGustas?.map(meGustaId => {
      console.log(meGustaId)
       return meGustaId.userId == userId && meGustaId._id
    }).toString()
    dispatch(meGustaProduct({id, idMegustas, userId}))
    console.log(userId)
    console.log(idMegustas)

  }
 
   

 //console.log(meGustas);
  return (
    <div className="col-md-4">
      <div key={product._id} className="card position-relative"  >
        <div className=" position-absolute right"><i onClick={() => meGustaHandle(product)} style={{cursor: 'pointer'}}  className={`fa fa-heart ${colorText}`} ></i> <p className={` ${colorText}`}>{product.meGustas?.length > 0 ? product.meGustas.map(megusta => megusta.meGustas).reduce((a, b) => a + b, 0) : 0 }</p></div>
      
        <Link to={`/product/${product._id}`}>
          <img className=" card-img-top card-img  p-2"  src={product.images[0].url} alt={product.name} />
        </Link>
        <div className="card-body">
          <Link to={`/product/${product._id}`}>
            <h2>{product.name}</h2>
          </Link>
          <Rating
            rating={product.rating}
            numReviews={product.numReviews}
          ></Rating>
          <div className="card-titler">
            <div className="price"> {new Intl.NumberFormat('es-DO',{style: 'currency', currency: 'DOP'}).format(parseFloat(userInfo && !userInfo.isAdmin ? product.price : product.price * OFFERS_AFILIADOS))}</div>
            <div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}