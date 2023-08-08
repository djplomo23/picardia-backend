import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../Components/CheckoutSteps';
import '../assets/css/PlaceOrder.css'
import { createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../Components/LoadingBox';
import MessageBox from '../Components/MessageBox';
import {OFFERS_AFILIADOS} from  '../constants/offerConstants';


function PlaceOrderScreen(props) {

    const cart = useSelector(state => state.cart);
    const {userInfo} = useSelector(state => state.userSignin);
    

    const { cartItems, shippingAddress, paymentMethod } = cart;
    if (!shippingAddress) {
        props.history.push("/shipping");
    } else if (!paymentMethod) {
        props.history.push("/payment");
    }

    const orderCreate = useSelector((state) => state.orderCreate);
    const { loading, success, error, order } = orderCreate;

    const itemsPrice = cartItems.reduce((a, c) => a + (userInfo && !userInfo.isAdmin ? c.price : c.price * OFFERS_AFILIADOS) * c.qty, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const itbisPrice = 0.18 * itemsPrice;
    const totalPrice = itemsPrice + shippingPrice + itbisPrice;




    const dispatch = useDispatch();

    const placeOrderHandler = () => {
        dispatch(createOrder({ ...cart, orderItems: cartItems, itemsPrice, paymentMethod, shippingPrice, itbisPrice, totalPrice, }));

    };

    useEffect(() => {
        if (success) {
            props.history.push(`/order/${order._id}`);
            dispatch({ type: ORDER_CREATE_RESET });
        }
    }, [dispatch, order, props.history, success]);


    let img = ''
    return (
        <div >
          <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
          <div className="row">
            <div className="col-md-8">
              <ul>
                <li>
                  <div className="card card-body">
                    <h2>Shipping</h2>
                    <p>
                      <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                      <strong>Address: </strong> {cart.shippingAddress.address},
                      {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
                      ,{cart.shippingAddress.country}
                    </p>
                  </div>
                </li>
                <li>
                  <div className="card card-body">
                    <h2>Payment</h2>
                    <p>
                      <strong>Method:</strong> {cart.paymentMethod}
                    </p>
                  </div>
                </li>
                <li>
                  <div className="card card-body">
                    <h2>Order Items</h2>
                    <ul>
                      {cart.cartItems.map((item) => (
                        <li key={item.product}>
                          {console.log(img = String(item.image[0].image))}
                          <div className="row">
                            <div>
                              <img
                                src={img = String(item.image[0].url)}
                                alt={item.name}
                                className="small"
                              ></img>
                            </div>
                            <div >
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </div>
    
                            <div>
                              {item.qty} x ${userInfo && !userInfo.isAdmin ? new Intl.NumberFormat('es-DO',{style: 'currency', currency: 'DOP'}).format(parseFloat(item.price)) : new Intl.NumberFormat('es-DO',{style: 'currency', currency: 'DOP'}).format(parseFloat(item.price * OFFERS_AFILIADOS ))} = {new Intl.NumberFormat('es-DO',{style: 'currency', currency: 'DOP'}).format(parseFloat(item.qty * (userInfo && !userInfo.isAdmin ? item.price : item.price *OFFERS_AFILIADOS)))} 
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <div className="card card-body">
                <ul>
                  <li>
                    <h2>Order Summary</h2>
                  </li>
                  <li>
                    <div className="row">
                      <div>Items</div>
                      <div>{new Intl.NumberFormat('es-DO',{style: 'currency', currency: 'DOP'}).format(parseFloat(itemsPrice))}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Shipping</div>
                      <div>{new Intl.NumberFormat('es-DO',{style: 'currency', currency: 'DOP'}).format(parseFloat(shippingPrice))}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Tax</div>
                      <div>{new Intl.NumberFormat('es-DO',{style: 'currency', currency: 'DOP'}).format(parseFloat(itbisPrice))}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>
                        <strong> Order Total</strong>
                      </div>
                      <div>
                        <strong>{new Intl.NumberFormat('es-DO',{style: 'currency', currency: 'DOP'}).format(parseFloat(totalPrice))}</strong>
                      </div>
                    </div>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={placeOrderHandler}
                      className="primary block"
                      disabled={cartItems.length === 0}
                    >
                      Place Order
                    </button>
                  </li>
                  {loading && <LoadingBox></LoadingBox>}
                  {error && <MessageBox variant="danger">{error}</MessageBox>}
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
    }
export default PlaceOrderScreen;