import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import Slider from "react-slick";
//import  {Carousel} from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import { Carousel} from 'react-bootstrap';


function CarouselJs() {

    const offerList = useSelector((state) => state.offerList);
    const { loadingOffers, errorOffers, offers } = offerList

   
    return (
        <Carousel className="mt-50"
       
        >
            {offers?.map((offers) => (
                <Carousel.Item key={offers._id}>
                    <>
                        <Link to={`/seller/${offers._id}`}>
                            <img className="img-fluid carousel" src={offers.image} alt={offers.tittle} />
                            <p className="legend">{offers.tittle}</p>
                        </Link>
                    </>
                </Carousel.Item>
            ))}
        </Carousel>
    )
};

export default CarouselJs;

