import React, { useState, useEffect } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useSelector, useDispatch } from 'react-redux';
import { listOffers } from '../actions/offerActions'



function OffersComponent(props) {

  const offerList = useSelector((state) => state.offerList);
  const { offers, loading, error } = offerList;
  const dispatch = useDispatch();
  

  useEffect(() => {

    dispatch(listOffers());

    return () => {
      //
    };
  }, [])



  return (
    
    
    loading ? (
      <div>Loading...</div>
    ) : error ? (
      <div>{error}</div>
    ) : (

     <div>{offers.map((offers) => {
       return ( <div key={offers._id}>
          <img src={offers.image} alt="offer"/>
          
        </div>)
      })} </div>
      
  
  ))
}

export default OffersComponent;