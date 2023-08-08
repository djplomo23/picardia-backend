import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PayPalButton } from "react-paypal-button-v2";
import { Link } from 'react-router-dom';
import {axios} from '../axios';
import '../assets/css/PlaceOrder.css'
import { deliverOrder, detailsOrder, payOrder } from '../actions/orderActions';
import { ORDER_PAY_RESET,ORDER_DELIVER_RESET } from '../constants/orderConstants';
import MessageBox from '../Components/MessageBox';
import LoadingBox from '../Components/LoadingBox';


export default function OrderScreen(props) {
    const orderId = props.match.params.id;
    const [sdkReady, setSdkReady] = useState(false);
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
  
    const orderPay = useSelector((state) => state.orderPay);
    const {
      loading: loadingPay,
      error: errorPay,
      success: successPay,
    } = orderPay;

    const orderDeliver = useSelector((state) => state.orderDeliver);
    const {
      loading: loadingDeliver,
      error: errorDeliver,
      success: successDeliver,
    } = orderDeliver;
    
    const dispatch = useDispatch();

    useEffect(() => {
      const addPayPalScript = async () => {
        const { data } = await axios.get('/api/config/paypal');
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
        script.async = true;
        script.onload = () => {
          setSdkReady(true);
        };
        document.body.appendChild(script);
      };
     
      if (!order || successDeliver ||successPay || (order && order._id !== orderId)) {
        dispatch({type: ORDER_PAY_RESET});
        dispatch({type: ORDER_DELIVER_RESET});
        dispatch(detailsOrder(orderId));
      } else {
        if (!order.isPaid) {
          if (!window.paypal) {
            addPayPalScript();
          } else {
            setSdkReady(true);
          }
        }
      }
    }, [dispatch, order, orderId, sdkReady, successPay, successDeliver]);

    const successPaymentHandler = (paymentResult) => {
      dispatch(payOrder(order, paymentResult));
    };

    const deliverHandler = () => {
      dispatch(deliverOrder(order._id));
    };
  
    return loading ? (
      <LoadingBox></LoadingBox>
    ) : error ? (
      <MessageBox variant="danger">{error}</MessageBox>
    ) : (
      
      <div className="container" key={order._id}>
        <Link to="/orderhistory"><i className="fa fa-arrow-left"></i> Orders history</Link>
        <p>Order {order._id}</p>
        <div className="row">
          <div className="col-md-4">
            <ul>
              <li>
                <div className="card card-body p-4">
                  <h2>Shippring</h2>
                  <p>
                    <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                    <strong>Address: </strong> {order.shippingAddress.address},
                    {order.shippingAddress.city},{' '}
                    {order.shippingAddress.postalCode},
                    {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <MessageBox variant="success">
                      Delivered at {order.deliveredAt}
                    </MessageBox>
                  ) : (
                    <MessageBox variant="danger">Not Delivered</MessageBox>
                  )}
                </div>
              </li>
              <li>
                <div className="card card-body">
                  <h2>Payment</h2>
                  <p>
                    <strong>Method:</strong> {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <MessageBox variant="success">
                      Paid at {order.paidAt}
                    </MessageBox>
                  ) : (
                    <MessageBox variant="danger">Not Paid</MessageBox>
                  )}
                </div>
              </li>
              <li>
                <div className="card card-body">
                  <h2>Order Items</h2>
                  <ul>
                    {order.orderItems.map((item) => (
                      <li key={item._id}>
                        <div key={item.product} className="row p-4">
                          <div>
                            <img
                              src={item.image[0].image}
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
                            {item.qty} x ${item.price} = ${item.qty * item.price}
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
                <li className="card-title text-center">
                  <h2>Order Summary</h2>
                </li>
                <li>
                  <div className="row px-4">
                    <div>Items</div>
                    <div>${order.itemsPrice.toFixed(2)}</div>
                  </div>
                </li>
                <li>
                  <div className="row px-4">
                    <div>Shipping</div>
                    <div>${order.shippingPrice.toFixed(2)}</div>
                  </div>
                </li>
                <li>
                  <div className="row px-4">
                    <div>Itbis</div>
                    <div>${order.itbisPrice.toFixed(2)}</div>
                  </div>
                </li>
                <li>
                  <div className="row px-4">
                    <div>
                      <strong> Order Total</strong>
                    </div>
                    <div>
                      <strong>${order.totalPrice.toFixed(2)}</strong>
                    </div>
                  </div>
                </li>
                {!order.isPaid && (
                  <li>
                    {!sdkReady ? (
                      <LoadingBox/>
                    ) : (
                      <>
                        {errorPay && (
                          <MessageBox variant="danger">{errorPay}</MessageBox>
                        )}
                        {loadingPay && <LoadingBox></LoadingBox>}
  
                        <PayPalButton
                          amount={order.totalPrice}
                          onSuccess={successPaymentHandler}
                        ></PayPalButton>
                      </>
                    )}
                  </li>
                )}
                {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                  <li>
                    {loadingDeliver && <LoadingBox></LoadingBox>}
                    {errorDeliver && (
                      <MessageBox variant="danger">{errorDeliver}</MessageBox>
                    )}
                    <button
                      type="button"
                      className="primary block"
                      onClick={deliverHandler}
                    >
                      Deliver Order
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }