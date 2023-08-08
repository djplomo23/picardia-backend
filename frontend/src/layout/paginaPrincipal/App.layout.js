
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown'
import {Navbar, Container, Row} from 'react-bootstrap'
import { signout } from '../../actions/userAction';
import AdminRoute from '../../Components/AdminRoute';
import PrivateRoute from '../../Components/PrivateRoute';
import CartScreen from '../../screen/CartScreen';
import HomeScreen from '../../screen/HomeScreen';
import OrderHistoryScreen from '../../screen/OrderHistoryScreen';
import OrderScreen from '../../screen/OrderScreen';
import PaymentMethodScreen from '../../screen/PaymentScreen';
import PlaceOrderScreen from '../../screen/PlaceOrderScreen';
import ProductListScreen from '../../screen/ProductListScreen';
import ProductScreen from '../../screen/ProductScreen';
import ProfileScreen from '../../screen/ProfileScreem';
import RegisterScreen from '../../screen/RegisterScreen';
import ShippingAddressScreen from '../../screen/ShippingScreen';
import SigninScreen from '../../screen/SigninScreen';
import ProductEditScreen from '../../screen/ProductEditScreen';
import OrderListScreen from '../../screen/OrderListScreen';
import UserListScreen from '../../screen/UserListScreen';
import UserEditScreen from '../../screen/UserEditScreen';
import SearchBox from '../../Components/SearchBox';
import SearchScreen from '../../screen/SearchScreen';
import { listProductCategories } from '../../actions/productActions';
import LoadingBox from '../../Components/LoadingBox';
import MessageBox from '../../Components/MessageBox';
//import MapScreen from './screens/MapScreen';
import logo from '../../img/LOGO-PICARDIA-NEGRO.png';
import CarouselJs from '../../Components/carousel';
import PaymentScreen from '../../screen/PaymentScreen'


function AppLayout() {
    const cart = useSelector((state) => state.cart);
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
    const { cartItems } = cart;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const dispatch = useDispatch();

    const signoutHandler = () => {
        dispatch(signout());
    };

    const productCategoryList = useSelector((state) => state.productCategoryList);
    const {
        loading: loadingCategories,
        error: errorCategories,
        categories,
    } = productCategoryList;

    useEffect(() => {
        dispatch(listProductCategories());
    }, [dispatch]);

    return (
        <BrowserRouter>
            <div >
                <Navbar className=" navbar navbar-expand border-bottom ">
                    <div className=" container">
                        <div>
                            <button
                                type="button"
                                className="open-sidebar botonMenu mr-sm-5"
                                onClick={() => setSidebarIsOpen(true)}
                            >
                                <i className="fa fa-bars "></i>
                            </button>
                            <Navbar.Brand className="navbar-brand m-auto" >
                                <Link to="/">
                                <img src={logo} alt="logo" className="logo" />
                                </Link>
                                
                            </Navbar.Brand>
                        </div>
                        <div>
                            <Route
                                render={({ history }) => (
                                    <SearchBox history={history}></SearchBox>
                                )}
                            ></Route>
                        </div>
                        <div>
                            <Link className="mr-2" to="/cart">
                                <i className="fa fa-shopping-bag " aria-hidden="true"></i>
                                {cartItems.length > 0 && (
                                    <span className="badge">{cartItems.length}</span>
                                )}
                            </Link>
                            {userInfo ? (
                                <Dropdown className="mr-sm-2" >
                                    <Dropdown.Toggle variant="" id="dropdown-basic">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="40" />
                                        
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu >
                                        <p className="text-center br">{userInfo.name} <i ></i>{' '}</p>
                                        <hr></hr>
                                        <Dropdown.Item href="/profile">
                                           Perfil
                                        </Dropdown.Item>
                                        <Dropdown.Item href="/orderhistory" >
                                            Historial de pedidos
                                        </Dropdown.Item>
                                        <hr></hr>
                                        {userInfo && userInfo.isAdmin && (
                                    <Dropdown  >
                                  
                                        <div className="text-center" >Admin</div> 
                                    
                                    
                                        <Dropdown.Item href="/dashboard">
                                          Dashboard
                                        </Dropdown.Item>
                                        <Dropdown.Item href="/productlist">
                                            Products
                                        </Dropdown.Item>
                                        <Dropdown.Item href="/orderlist">
                                            Orders
                                        </Dropdown.Item>
                                        <Dropdown.Item href="/userlist">
                                        Users
                                        </Dropdown.Item>
                               
                                    </Dropdown>
                                         )}
                                    <hr></hr>
                                        <Dropdown.Item href="#signout" onClick={signoutHandler}>
                                                Sign Out
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            ) : (
                                    <Link to="/signin">Sign In</Link>
                                )} 
                            
                        </div>
                    </div>
                </Navbar>
                <aside className={sidebarIsOpen ? 'open' : ''}>
                    <ul className="categories">
                        <li>
                            <strong>Categories</strong>
                            <button
                                onClick={() => setSidebarIsOpen(false)}
                                className="close-sidebar"
                                type="button"
                            >
                                <i className="fa fa-close"></i>
                            </button>
                        </li>
                        {loadingCategories ? (
                            <LoadingBox></LoadingBox>
                        ) : errorCategories ? (
                            <MessageBox variant="danger">{errorCategories}</MessageBox>
                        ) : (
                                    categories.map((c) => (
                                        <li key={c}>
                                            <Link
                                                to={`/search/category/${c}`}
                                                onClick={() => setSidebarIsOpen(false)}
                                            >
                                                {c}
                                            </Link>
                                        </li>
                                    ))
                                )}
                    </ul>
                </aside>
                <div >
                <Route path="/" component={CarouselJs} exact></Route>
                </div>
                <div className="container p-4 min-vh-100">
                <div className="row">
                <div className="col-md-12">
                    <Route path="/cart/:id?" component={CartScreen}></Route>
                    <Route path="/product/:id" component={ProductScreen} exact></Route>
                    <Route
                        path="/product/:id/edit"
                        component={ProductEditScreen}
                        exact
                    ></Route>
                    <Route path="/signin" component={SigninScreen}></Route>
                    <Route path="/register" component={RegisterScreen}></Route>
                    <Route path="/shipping" component={ShippingAddressScreen}></Route>
                    <Route path="/payment" component={PaymentScreen}></Route>
                    <Route path="/placeorder" component={PlaceOrderScreen}></Route>
                    <Route path="/order/:id" component={OrderScreen}></Route>
                    <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
                    <Route
                        path="/search/name/:name?"
                        component={SearchScreen}
                        exact
                    ></Route>
                    <Route
                        path="/search/category/:category"
                        component={SearchScreen}
                        exact
                    ></Route>
                    <Route
                        path="/search/category/:category/name/:name"
                        component={SearchScreen}
                        exact
                    ></Route>
                    <Route
                        path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
                        component={SearchScreen}
                        exact
                    ></Route>
                    <PrivateRoute
                        path="/profile"
                        component={ProfileScreen}
                    ></PrivateRoute>

                    <AdminRoute
                        path="/productlist"
                        component={ProductListScreen}
                        exact
                    ></AdminRoute>
                    <AdminRoute
                        path="/productlist/pageNumber/:pageNumber"
                        component={ProductListScreen}
                        exact
                    ></AdminRoute>
                    <AdminRoute
                        path="/orderlist"
                        component={OrderListScreen}
                        exact
                    ></AdminRoute>
                    <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
                    <AdminRoute
                        path="/user/:id/edit"
                        component={UserEditScreen}
                    ></AdminRoute>
                     <Route path="/" component={HomeScreen} exact></Route>
                    </div>
                    </div>
                </div>
                
                <footer className="">All right reserved</footer>
                
            </div>
            
        </BrowserRouter>
    );
};
export default AppLayout;
