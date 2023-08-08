import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../img/LOGO-PICARDIA-NEGRO.png';
import SigninScreen from '../../screen/SigninScreen';
import SearchScreen from '../../screen/SearchScreen';
import Cookie from 'js-cookie';
import { signout } from '../../actions/userAction';
import SearchBox from '../../Components/SearchBox';



const openMenu = () => {
  document.querySelector(".sidebar").classList.add("open");
  document.querySelector(".header").classList.add("button-ocurto");
  document.querySelector('body').classList.add("stop");
};



const Headerhome = () => {
  const userSignin = useSelector((state) => state.userSignin);
  const cart = useSelector((state) => state.cart)
  const { userInfo } = userSignin;
  const { cartItems } = cart

  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signout());
  }


  return (
    <header className="bg-red-500" id="header">
      <div className="brand">
        <button id="btnMenu" onClick={openMenu}>
          &#9776;
                </button>
        <Link to="/" ><img src={logo} alt="logo" /></Link>
      </div>

      <div>
        <Route
          render={({ history }) => (
            <SearchBox history={history}></SearchBox>
          )}
        ></Route>
      </div>

      <div className="header-links">
        <Link to="/cart">
        <i class="fa fa-shopping-bag" aria-hidden="true"></i>
          {cartItems.length > 0 && (
            <span className="badge">{cartItems.length}</span>
          )}
        </Link>
        {
          userInfo ? (
            <div className="dropdown">
              <Link to="#">
              <i className="fa fa-user-circle" aria-hidden="true"></i>
              </Link>
              <p>{userInfo.name} <i className="fa fa-caret-down"></i>{' '}</p>
              <ul className="dropdown-content">
                <li>
                  <Link to="/profile">User Profile</Link>
                </li>
                <li>
                  <Link to="/orderhistory">Order History</Link>
                </li>
                <li>
                  <Link to="/signout" onClick={signoutHandler}>
                    Sign Out
                              </Link>
                </li>
              </ul>
            </div>
          ) : (
              <Link to="/signin">Sign In</Link>
            )

        }

        {userInfo && userInfo.isAdmin && (
          <div className="dropdown">
            <Link to="#admin">
              Admin <i className="fa fa-caret-down"></i>
            </Link>
            <ul className="dropdown-content">
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/productlist">Products</Link>
              </li>
              <li>
                <Link to="/orderlist">Orders</Link>
              </li>
              <li>
                <Link to="/userlist">Users</Link>
              </li>
            </ul>
          </div>
        )}




      </div>

    </header>
  )
}

export default Headerhome;