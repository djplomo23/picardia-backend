const aws = require ('aws-sdk')

const  multer = require ('multer');
const multerS3 = require ('multer-s3')
const  express = require ('express');
const fs = require ('fs/promises')
const  { isAuth } = require ('../util');
const cloudinary = require('cloudinary');
const dotenv = require('dotenv');

dotenv.config();
const uploadRouter = express.Router();

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION
})


/*const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads'); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}.jpg`);
  },
});*/

  
const upload = multer({ storage: multerS3({
    s3: s3,
    bucket: 'imagen-de-productos',
    metadata: function(req, file, cb){
      cb(null, {fieldName: file.fieldname})
    },
    key: function(req, file, cb){
      cb(null, `${Date.now().toString()}image.jpeg`);
    }
  }) });


uploadRouter.post('/', isAuth, upload.array('imageFile', 10),  async (req, res) =>{
  

  
  try {
    const result = await req.files
    console.log(result)
    res.send(result)
  } catch (error) {
    console.log(error)
    res
      .status(400)
      .send({message: error.message})
  }
 
 
});


uploadRouter.delete('/delete/:id', isAuth,  async (req, res) =>{
  
 
  const  parametros = {
    Bucket: 'imagen-de-productos',
    Key: req.params.id 
  }
  
  const hj = () =>{
    s3.deleteObject(parametros, function(err, data){
      if(err) console.log(err, err.stack);
      else console.log(data), res.send({message: 'Imagen Elinada', data})
    })
    
  }

  
  try {
    
   const result = hj()
   console.log(result)
    
  } catch (error) {
    res
      .status(400)
      .send({message: error.message})
  }
 
 
});

/*uploadRouter.post('/', isAuth, upload.array('imageFile'), async (req, res) => {
  
  try {
    
 
  const imagenes = req.files.map(item => item.path);
  let result = []
  
  for (let i = 0; i < imagenes.length; i++) {
    
      result.push(cloudinary.v2.uploader.upload( imagenes[i]));
      
 
  }
  
 

 // console.log(req.files.map(image => image.path))
  //await fs.unlink(req.files.map(image => image.path))
  const resultados = await Promise.all(result)

  if(resultados){
    for (let i = 0; i < imagenes.length; i++) {
    
      await fs.unlink( imagenes[i]);
  
      }
  }
  
  res.json(resultados);
  } catch (error) {
    res
      .status(400)
      .send({message: error.message})
  }

  
 
 
 
});*/

module.exports = uploadRouter;