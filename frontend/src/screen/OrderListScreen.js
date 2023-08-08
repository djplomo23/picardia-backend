import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, listOrders } from '../actions/orderActions';
import LoadingBox from '../Components/LoadingBox';
import MessageBox from '../Components/MessageBox';
import { ORDER_DELETE_RESET } from '../constants/orderConstants';
import Card from '../Components/card'

export default function OrderListScreen(props) {
  const sellerMode = props.match.path.indexOf('/seller') >= 0;
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    success: successDelete,
  } = orderDelete;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;



  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: ORDER_DELETE_RESET });
    dispatch(listOrders({ seller: sellerMode ? userInfo._id : '' }));
  }, [dispatch, sellerMode, successDelete, userInfo._id]);

  

  const url = props // para la el onclick




  
  return (
    <div className="container" >
      <h1>Orders</h1>
      <div >
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row">
           {orders.length > 0 && (
              <p>{orders.length}</p>
            ) }       
          {orders.map((order) =>(
            <>
          
            <Card className="col-md-12" key={order._id} url={url}  order={order}  ><p>{order.shippingAddress.fullName}</p></Card>
            
            
            </>
          ))}
          
            </div>
       
        
      )}
       </div>
    </div>
  );
}