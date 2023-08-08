import React from 'react'
import Rating from './Rating'


const CardList = (props) => {

    const { product } = props

    let images = []
    

    return (

        <div className="col-lg-8 mx-auto">

            <ul className="list-group shadow">

                <li className="list-group-item">

                    <div className="media align-items-lg-center flex-column flex-lg-row p-3">
                        <div className="media-body order-2 order-lg-1">
                            <h5 className="mt-0 font-weight-bold mb-2">{product.name}</h5>
                            <p className="font-italic text-muted mb-0 small">{product.description}</p>
                            <div className="d-flex align-items-center justify-content-between mt-1">
                                <h6 className="font-weight-bold my-2">${product.price}</h6>
                                <Rating
                                    rating={product.rating}
                                    numReviews={product.numReviews}
                                    style={{display: 'none'}}
                                ></Rating>
                            </div>
                        </div><img src={product?.images[0].url} alt={product.name} width="50" className="ml-lg-5 order-1 order-lg-2" />
                    </div>
                </li>
            </ul>
        </div>


    )
};

export default CardList;