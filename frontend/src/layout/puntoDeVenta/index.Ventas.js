import React from 'react';
import { Route } from 'react-router-dom';
import HeaderVentas from './headerVentas';
import MainContainetVentas from './mainContainetVentas';
import MainContentVentas from './mainContentVentas';
import RightNavVentas from './right.NavVentas';
import MainFacturaVentas from './mainFacturaVentas';
import '../../assets/css/VentasStyle.css'
import ProductsScreen from '../../screen/ProductsScreen';
import UsersScreen from '../../screen/UsersScreen';
import AppFactura from '../factura/index.Factura';
import VentasProductsScreen from '../../screen/VentasProductsScreen';

const AppVentas = () => {
    return (
        <MainContainetVentas>
            <HeaderVentas />
            <RightNavVentas />
            <MainFacturaVentas>
                <Route path="/" exact={true} component={AppFactura} />
            </MainFacturaVentas>

            <MainContentVentas>
                <Route path="/" exact={true} component={VentasProductsScreen} />
               
                
            </MainContentVentas>
        </MainContainetVentas>
    )
}

export default AppVentas;