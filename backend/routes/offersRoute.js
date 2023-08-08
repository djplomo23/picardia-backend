const express = require ('express');
const Offers = require ('../models/offersUploader');
//const {verifyToken, isAdmin, isAffiliate} = require('../middlewares/index')


const router = express.Router();
router.get("/",  async(req, res) =>{
    const offers = await Offers.find({});
    
    
    return res.send(offers)
    
    })


router.post("/", async(req, res) =>{
    const offers = new Offers({
      name: req.body.name,
      image: req.body.image,
      tittle: req.body.tittle,
    });
    const newOffer = await offers.save();
    if(newOffer){
       return res.status(201).send({ message: "New Offer Created", data: newOffer});
    }
    return res.status(500).send({message: 'Error in Create Offer.'});
})

router.put("/:id", async (req, res) =>{

    const offerId = req.params.id;
    const offer = await Offers.findById(offerId);
    if(offer){
    
      offer.name = req.body.name;
      offer.image = req.body.image;
      offer.tittle = req.body.tittle;
     
    const updatedOffer = await Offer.save(offer);
    if(updatedOffer){
       return res.status(200).send({ message: "New Product Updated", data: updatedOffer});
    }
    
}
    return res.status(500).send({message: 'Error in Updating Product.'});

});

router.delete('/:id',  async (req, res) => {
    const deletedOffer = await Offers.findById(req.params.id);
    if(deletedOffer){
        await deletedOffer.remove();
        res.send({message: "offer Deleted"});
    }else{
    res.send("Error in Deletion")
    }
});
   
 
module.exports = router; 