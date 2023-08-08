import React from 'react'



const Card = (props) => {

    const {order, url, } = props
 
    return (
        <div  className="bg-red-700" >
            {order.orderItems.map((product) => (
                <div className="col" key={product._id} onClick={() => {
                    url.history.push(`/order/${order._id}`);
                  }}>
                
                <div className="row">
           
                <img className="card-img widthImage flexStart" src={product.image[0].image} alt="Card image cap" />
                    <h5 className="card-title">{product.name}</h5>
                    <span>PAGADO: {order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</span>
                    <span>ENTREGADO: {order.isDelivered ? order.deliveredAt.substring(0, 10) : 'No'}</span>
                    <p className="card-text"><small className="text-muted">{order.createdAt.substring(0, 10)}</small></p>
                </div>
                </div>
            ))}
            
    </div>
    )
};

export default Card;