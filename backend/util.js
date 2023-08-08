const jwt  = require ('jsonwebtoken');

const getToken = (seller) => {
    return jwt.sign({
        _id: seller._id,
        name: seller.name,
        email: seller.email,
        isAdmin: seller.isAdmin,
   
        

    }, process.env.JWT_SECRET, {
        expiresIn: '20h'
    })
}
 const isAuth = (req, res, next) => {
    const token = req.headers.authorization;
   
    if (token) {
        const onlyTonke = token;
        jwt.verify(onlyTonke, process.env.JWT_SECRET,(err, decode)=>{
            if (err) { 
                return res.status(401).send({msg: 'Invalid Token' });
            }
            req.user = decode;
            next();
            return
        });
    } else {
      res.status(401).send({ message: 'No Token' });
    }
  };

const isAdmin = (req, res, next) => {
 
    if (req.user && req.user.isAdmin) {
      return next();
    }
    return res.status(401).send({ message: 'Admin Token is not valid.' });
  };
  


module.exports = { getToken, isAuth, isAdmin };   