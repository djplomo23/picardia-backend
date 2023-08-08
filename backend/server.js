const dotenv = require('dotenv');
const express = require('express');
const path = require('path');

const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const cors = require('cors');
//const { createRoles } = require('./libs/initialSetup')
//const { verifyToken, isAdmin, isAffiliate } = require('./middlewares/index');
const offersRoute = require('./routes/offersRoute');
const orderRouter = require('./routes/orderRouter');
const  uploadRouter  = require('./routes/uploadRouter');
const SellerRoute = require('./routes/SellerRout')
const cuentaRoute = require('./routes/cuentaRoute');
const facturaRouter = require('./routes/facturaRouter');
const configRoute = require('./routes/configRoute')



 
//Initializations
dotenv.config();
const app = express();
//require('./passport');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(cors({ origin: true }));



//settings


//middlewares

app.use(cookieParser());
//app.set('trust proxy', 1);
app.use(session({
  secret: 'Clave secreta',
  resave: false,
  saveUninitialized: false,
  //cookie: { secure: true, maxAge: null, },
}));
app.use(passport.initialize());
app.use(passport.session());



const mongodbUrl = process.env.MONGODB_URL;
mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true,
})
  .then(db => console.log('Db is connected'))
  .catch(error => console.log(error.reason));


  app.use((req, res, next) => {

    const corsWhitelist = [
      process.env.WEB_FRONTEND,
      process.env.WEB_FRONTEND2,
    ]

    if(corsWhitelist.indexOf(req.headers.origin) !== -1){
      res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    }

    
    next();
});




//createRoles();
// router
app.use(cors({
  methods:['GET','POST', 'PUT', 'DELETE'],
  credentials: true,
  origin: true,
 
}));
app.use('/api/uploads', uploadRouter);
app.use("/api/users", userRoute);
app.use("/api/sellers", SellerRoute);
app.use("/api/cuentas", cuentaRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRouter);
app.use("/api/factura", facturaRouter);
app.use("/api/offers", offersRoute);
app.use("/api/config", configRoute)
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

//app.use('/img', express.static(path.join(__dirname, '/backend/uploads')));
app.use(express.static(path.join(__dirname, '../public')));
/*app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public_html/index.html'))
);*/

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
  next();
});




//sarting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { console.log('server started on port' + PORT) });