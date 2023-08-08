import React, { useState, useEffect } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { useSelector, useDispatch } from 'react-redux';
import { listOffers } from '../actions/offerActions'



function OffersScreen(props) {
  
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

    <Carousel className="carousel" infiniteLoop={true} showArrows={true} showStatus={true} showThumbs={true} autoPlay={true} >
      <div>{offers.map((offers) => (
        <div key={offers._id}>
          <img src={offers.image} alt="offer"/>
          
        </div>
      ))} </div>
      
    </Carousel>
  ))
}

export default OffersScreen;