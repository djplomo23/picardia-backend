const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const Seller = require('../models/sellerModel');
const jwt = require('jsonwebtoken');
//const passport = require('passport');

//const Role = require('../models/Roles');
const { getToken, isAuth, isAdmin } = require('../util');
const Sesion = require('../models/sesionModel');




const router = express.Router();

router.get("/", async (req, res) => {

  const sellers = await Seller.find({},{'password': 0});

  return res.send(sellers)

});

/*router.post('/signin', passport.authenticate('local-signin', 
{ successRedirect: '/api/products',
  failureRedirect: '/signin', session: true
  }), function (req, res) {
      res.send({
        req.user
        
        })
  });*/



/*router.post('/signin', passport.authenticate("local-signin"), async (req, res) => {
    const user = await User.findOne({ email: req.body.email }).populate("roles");
    res.redirect('/api/products')
    req.login(user, {session: false}, async (err) =>{
        if (err) return next(err)
    });
    res.json({
        _id:  req.user._id,
        name: req.user.name,
        email: req.user.email,
        roles: req.user.roles,
        token: getToken(user)
    });
    return;
});*/



router.post('/signout', (req, res, next) => {

  req.logout();

});


router.post(
  '/signin', 
  expressAsyncHandler(async (req, res) => {
    const {email,  password} = req.body
    const seller = await Seller.findOne({ email });
    if (!seller) return res.status(400).json({message: 'Email Incorrecto'})

    const matchPassword = await Seller.comparePassword(req.body.password, seller.password)

    if(!matchPassword) return res.status(401).json({token: null, message: 'Contraseña Incorrecta'})

       if(seller && matchPassword){
          res.send({
          _id: seller._id,
          name: seller.name,
          lasName: seller.lasName,
          userName: seller.userName,
          email: seller.email,
          isAdmin: seller.isAdmin,
          isSeller: seller.isSeller,
          incentivo: seller.incentivo,
          token: getToken(seller),
        });
      }
   
  

   
  }) 
  
);

router.get("/sesionlis", isAuth, async (req, res) => {

  const sesions = await Sesion.find().sort({inicioDeSesion: -1}).limit(30);

  return res.send(sesions)

});

router.post(
  '/sesion', isAuth,
  expressAsyncHandler(async (req, res) => {
   
    const {inicioSesion} = req.body
    
         
        const sesion = new Sesion({
          user: req.user._id,
          inicioDeSesion: inicioSesion,
          cierreDeSesion: 0
        });
   
        const createdSesion = await sesion.save();
    res.send({ sesion: createdSesion });
  })
);

router.put(
  '/cerrarsesion', isAuth,
  expressAsyncHandler(async (req, res) => {
    
    const {cierreSesion, sesionId } = req.body;
    const sesion = await Sesion.findById(sesionId)
   
        if(sesion){
          
          sesion.cierreDeSesion = cierreSesion
          
          const updatedSesion = await sesion.save();
         
          res.send({ message: `Cerraste sesion a las${cierreSesion}`, sesion: updatedSesion })
        }else {
          res.status(404).send({ message: `Cerrrar sesion fallo`})
        }
        
   
        
    ;
  })
);







/*router.post('/signin', expressAsyncHandler( async (req, res) => {

    const user = await User.findOne({ email: req.body.email }).populate("roles");

    if (!user) return res.status(400).json({message: 'User not found'})

    const matchPassword = await User.comparePassword(req.body.password, user.password)

    if(!matchPassword) return res.status(401).json({token: null, message: 'Invalid password'})
    
    res.send({
        _id:  user._id,
        name: user.name,
        email: user.email,
        roles: user.roles,
        token: getToken(user),
        
    });
    return;
}));*/

router.post('/register', async (req, res) => {

  const {userName, name, lastName, email, password,  isAdmin, isSeller } = req.body;

  const seller = new Seller({
    userName,
    name,
    lastName,
    email,
    password: await Seller.encryptPassword(password),
    isAdmin,
    isSeller
  });

  const newSeller = await seller.save();
  res.status(200).json({
    _id: newSeller._id,
    userName: newSeller.userName,
    name: newSeller.name,
    lasName: newSeller.lastName,
    email: newSeller.email,
    isAdmin: newSeller.isAdmin,
    isSeller: newSeller.isSeller,
     
  })
});

/*router.post('/register', async (req, res) => {

    const {name, email, password, roles} = req.body;

    const user =  new User ({
        
        name,
        email,
        password: await User.encryptPassword(password)
    });

    if(roles) {
       const foundRoles = await Role.find({name: {$in: roles}})
       user.roles = foundRoles.map(role => role._id)
    }else{
        const role = await Role.findOne({name: "user"})
        user.roles = [role._id]
    }
    
    const newUser = await user.save();
    res.status(200).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        token: getToken(newUser)})
});*/

router.get(
  '/:id', 
  expressAsyncHandler(async (req, res) => {
    const seller = await Seller.findById(req.params.id);
    if (seller) {
      res.send(seller);
    } else {
      res.status(404).send({ message: 'Verndedor no encontrado' });
    }
  })
); 

router.put(
  '/probando',
  isAuth,
 
  expressAsyncHandler( async (req, res) => {
    try {


    const seller = await Seller.findById(req.body._id);
    
    if (seller) {
      seller.userName = req.body.userName 
      seller.name = req.body.name
      seller.lastName = req.body.lastName
      seller.email = req.body.email 
      seller.incentivo = req.body.select
      seller.isAdmin = req.body.isAdmin
      seller.isSeller = req.body.isSeller
      
      if (req.body.password) {
        seller.password = await Seller.encryptPassword(req.body.password);
      }
      
      const updatedSeller = await seller.save();
   
   res.send({
        message: 'Empleado Actualizado', EmpleadoActualizado: updatedSeller
      });
      
    }
      
    } catch (error) {
   
      res
        .status(400)
        .send({ message: error.message });
    }
    
  })
);



router.put(
  '/profile', isAuth,
  
  expressAsyncHandler(async (req, res) => {
    
    const seller = await Seller.findById(req.body._id);
    
    if (seller) {
      seller.userName = req.body.userName 
      seller.name = req.body.name
      seller.lastName = req.body.lastName
      seller.email = req.body.email 
      //seller.incentivo = req.body.select
      seller.isAdmin = req.body.isAdmin
      seller.isSeller = req.body.isSeller
      
      
      if (req.body.password) {
        seller.password = await Seller.encryptPassword(req.body.password);
      }
      const updatedSeller = await seller.save();
   res.send({
        message: 'Empleado Actualizado'
      });
      res.end()
      
     
    }
  })
);

router.delete(
  '/:id',
  
  expressAsyncHandler(async (req, res) => {
    const seller = await Seller.findById(req.params.id);
    if (seller) {
      if (seller.email === 'admin@example.com') {
        res.status(400).send({ message: 'Can Not Delete Admin User' });
        return;
      }
      const deleteSeller = await seller.remove();
      res.send({ message: 'User Deleted', seller: deleteSeller });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

router.put(
  '/:id',
  
  expressAsyncHandler(async (req, res) => {
    const seller = await Seller.findById(req.params.id);
    if (seller) {
      seller.name = req.body.name || seller.name;
      seller.apellido = req.body.apellido || seller.apellido;
      seller.username = req.body.username || seller.username;
      seller.email = req.body.email || seller.email;
      seller.isSeller = Boolean(req.body.isSeller);
      seller.isAdmin = Boolean(req.body.isAdmin);
      seller.isAdmin = req.body.isAdmin || seller.isAdmin;
      const updatedSeller = await seller.save();
      res.send({ message: 'User Updated', seller: updatedSeller });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);



router.get('/createadmin', async (req, res) => {
  try {
    const user = new User({
      name: 'Ariel',
      email: 'dj-plomo@hotmail.com',
      password: '1234',
      isAdmin: true,

    });
    const newUser = await user.save();
    res.send(newUser);

  } catch (error) {
    res.send({ msg: error.message });
  }

});

module.exports = router;