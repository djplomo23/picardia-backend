import Axios from 'axios';

export const axios = Axios.create({
    withCredentials: true,   
    baseURL: process.env.REACT_APP_API, //variable de entorno 
    headers: { 'Content-Type': 'application/json'},
    headers: {'Access-Control-Allow-Origin': '*'},
    
    timeout: 20000,
});