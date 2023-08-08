import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import HomeScreen from './screen/HomeScreen';
import ProductScreen from './screen/ProductScreen';
import logo from './img/LOGO-PICARDIA-NEGRO.png';
import logoBlanco from './img/LOGO-PICARDIA--BLANCO.png';
import CartScreen from './screen/CartScreen';
import SigninScreen from './screen/SigninScreen';
import offersScreen from './screen/offersScreen';
import superProductosScreen from './screen/superProductosScreen';
import callToAction from './screen/callToActionScreen';
import callToActionEmail from './screen/callToActionEmail';
import envioSeccion from './screen/envioSeccionScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './screen/RegisterScreen';
import reviewScreen from './screen/ReviewScreen';
import productosDestacados from './screen/DestacadoProductScreen';
import ProductsScreen from './screen/ProductsScreen';
import ShippingScreen from './screen/ShippingScreen';
import PaymentScreen from './screen/PaymentScreen';
import DashboardScreen from './screen/DashbhoardScreen';





function App() {
    const pathname = window.location.pathname;
    const display = pathname === "/dashboard" ? {display: 'none'} : {display: 'flex'}
    const displayContainet = pathname === "/dashboard" ? {gridTemplateRows: '1fr'} : {gridTemplateRows: '10rem 1fr 15rem'}
    
    
    
    

  

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    
    console.log(userInfo)

    const openMenu = () => {
        document.querySelector(".sidebar").classList.add("open");
        document.querySelector(".header").classList.add("button-ocurto");
        document.querySelector('body').classList.add("stop");
    };
    const closeMenu = () => {
        document.querySelector(".sidebar").classList.remove("open");
        document.querySelector(".header").classList.remove("button-ocurto");
        document.querySelector('body').classList.remove("stop");
    };

    return (
        <BrowserRouter>
            <div className="grid-container" style={displayContainet}>
                <header className="header" style={display} id="header">
                    <div className="brand">
                        <button id="btnMenu" onClick={openMenu}>
                            &#9776;
                </button>
                        <Link to="/" ><img src={logo} alt="logo" /></Link>
                    </div>
                    <div className="header-links">
                        <a href="cart.html">Cart</a>
                        {
                            userInfo ? (<Link to="/profile">{userInfo.name}</Link>) :
                                (<Link to="/signin" >Sign-In</Link>)

                        }


                    </div>
                </header>
                <aside className="sidebar">
                    <h3>Category</h3>
                    <button className="sidebar-close-buttom" onClick={closeMenu}>x</button>
                    <ul>
                        <li>
                            <a href="index.html">Pants</a>
                        </li>
                        <li>
                            <a href="index.html">Shirts</a>
                        </li>


                    </ul>
                </aside>
                <main className="main">
                    <div className="content">
                        
                        <Route path="/products" component={ProductsScreen} />
                        <Route path="/shipping" component={ShippingScreen} />
                        <Route path="/payment" component={PaymentScreen} />
                        <Route path="/signin" component={SigninScreen} />
                        <Route path="/register" component={RegisterScreen} />
                        <Route path="/product/:id" component={ProductScreen} />
                        <Route path="/cart/:id?" component={CartScreen} />
                        <Route path="/" exact={true} component={offersScreen} />
                        <Route path="/" exact={true} component={superProductosScreen} />
                        <Route path="/" exact={true} component={HomeScreen} />
                        <Route path="/" exact={true} component={callToAction} />
                        <Route path="/" exact={true} component={productosDestacados} />
                        <Route path="/" exact={true} component={reviewScreen} />
                        <Route path="/" exact={true} component={envioSeccion} />
                        <Route path="/" exact={true} component={callToActionEmail} />
                        <Route path="/dashboard" component={DashboardScreen} />


                    </div>
                </main>
                <footer className="footer" style={display}>
                    <Link to="/" ><img src={logoBlanco} alt="logo" /></Link>
                    <h3>All right reserved.</h3>
                </footer>
            </div>
        </BrowserRouter>
    );
    
    }

export default App;
