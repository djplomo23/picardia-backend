import React from 'react';
import {  Route } from 'react-router-dom';
import '../../assets/css/FacturaStyle.css';
import ProductsScreen from '../../screen/ProductsScreen';
import UsersScreen from '../../screen/UsersScreen';
import MainContentFactura from './mainContentFactura';
import MainContainetFactura from './mainContainetFactura';
import HeaderFactura from './headerFactura';
import MainSubtotalFactura from './mainSubtotalFactura';
import FacturaTablaScreen from '../../screen/FacturaTabla';
import HomeScreen from '../../screen/HomeScreen';

const AppFactura = () => {
    return (
        <MainContainetFactura>
            <HeaderFactura />
            <MainContentFactura>
                <Route path="/" exact={true} component={FacturaTablaScreen} />
                
            </MainContentFactura>
            <MainSubtotalFactura>
                
            </MainSubtotalFactura>
        </MainContainetFactura>
   
    )
}

export default AppFactura;