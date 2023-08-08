import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './index.css'
import DashboardScreen from './screen/DashbhoardScreen';
import AppLayout from './layout/paginaPrincipal/App.layout';
import AppVentas from './layout/puntoDeVenta/index.Ventas';







function App() {


    

    const closeMenu = () => {
        document.querySelector(".sidebar").classList.remove("open");
        document.querySelector(".header").classList.remove("button-ocurto");
        document.querySelector('body').classList.remove("stop");
    };

    return (
        <BrowserRouter>

        <div className="bg-orange-600">
            <AppLayout />
            </div>

        </BrowserRouter>
    );

}

export default App;
