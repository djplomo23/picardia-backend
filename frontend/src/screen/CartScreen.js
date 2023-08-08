import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartAction';
import MessageBox from '../Components/MessageBox';
import { OFFERS_AFILIADOS } from '../constants/offerConstants'

export default function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { cartItems, error } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    props.history.push('/signin?redirect=shipping');
  };

  let img = ''

  return (
    <div >
      <div className="row">
        <div className="col-md-8">
          <h1>Shopping Cart</h1>
          {error && <MessageBox variant="danger">{error}</MessageBox>}
          {cartItems.length === 0 ? (
            <MessageBox>
              El carrito está vacío. <Link to="/">Ir de compras</Link>
            </MessageBox>
          ) : (
              <ul >
                {cartItems.map((item) => (
                  <li className="card card-body" key={item.product}>
                    <div className="row">

                      <div>
                        <img
                          src={img = String(item.image[0].url)}
                          alt={item.name}
                          className="small"
                        ></img>
                      </div>
                      <div >
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </div>
                      <div >
                        <select
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.product, Number(e.target.value))
                            )
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                            
                      </div>
                      <div>{new Intl.NumberFormat('es-DO',{style: 'currency', currency: 'DOP'}).format(parseFloat(userInfo && !userInfo.isAdmin ? (item.price) : (item.price * OFFERS_AFILIADOS)))}</div>
                      <div>
                        <button
                          type="button"
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          Delete
                    </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
        </div>
        <div className="col">
          <div className="card card-body">
            <ul>
              <li>
                <h2>
                  Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : {new Intl.NumberFormat('es-DO',{style: 'currency', currency: 'DOP'}).format(parseFloat(cartItems.reduce((a, c) => a + (userInfo && !userInfo.isAdmin ? c.price : c.price * OFFERS_AFILIADOS) * c.qty, 0)))}
                
                </h2>
              </li>
              <li>
                <button
                  type="button"
                  onClick={checkoutHandler}
                  className="primary block"
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout
              </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};