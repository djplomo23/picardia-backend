import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrderMine } from '../actions/orderActions';
import LoadingBox from '../Components/LoadingBox';
import MessageBox from '../Components/MessageBox';
import Card from '../Components/card'

export default function OrderHistoryScreen(props) {
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);

  const url = props // para la el onclick


  return (
    <div className="container">
      <h1>Order History</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row">           
          {orders.map((order) =>(
            <Card key={order._id} url={url} order={order} />
          ))}
            
           
        </div>
        

      )}
    </div>
  );
}