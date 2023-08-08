import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveOffer, listOffers, deleteOffer } from '../actions/offerActions';









const OffersUploader = (props) => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [tittle, setTittle] = useState('');
    const [image, setImage] = useState('');

    const offerList = useSelector((state) => state.offerList);
    const {
        loading, offers,
        error } = offerList;

    const offerSave = useSelector((state) => state.offerSave);
    const {
        loading: loadingSave,
        success: successSave,
        error: errorSave } = offerSave;

    const offerDelete = useSelector((state) => state.offerDelete);
    const {
        loading: loadingDelete,
        success: successDelete,
        error: errorDelete } = offerDelete;
    const dispatch = useDispatch();

    useEffect(() => {
        if (successSave) {
            
        }
        dispatch(listOffers());
        return () => {
            //
        };
    }, [successSave, successDelete]);


    const submitHandler = (e) => {
        e.preventDefault();


        dispatch(
            saveOffer({
                _id: id, name,
                tittle, image,
            }));
    };
    const deleteHandler = (offer) => {
        dispatch(deleteOffer(offer._id));
    }

    const openModal = (product) =>{
        setId(product._id);
        setName(product.name);
        setTittle(product.tittle);
        setImage(product.image);
    };


    return  (
        
        <div>
            <div className="product-header">
            <h3>Products</h3>
            <button className="button primary" 
            onClick={() => openModal({})}>Create Product</button>
        </div>
            <div>
                <form onSubmit={submitHandler} className="formOffers">
                    <ul>
                        <li>
                        <input type="text" name="tittle" id="tittle" value={name || ''} onChange={(e) => setTittle(e.target.value)}  />
                        </li>
                        <li>
                        <input type="text" name="image" id="image" required value={image || ''} onChange={(e) => setImage(e.target.value)}  />
                        </li>
                        <li>
                            <button type="submit" className="button primary">
                                {id ? 'Update' : 'Create'}</button>
                        </li>
                        <li>
                            <button
                                type="button"
                                
                                className="button secondary">Back</button>
                        </li>
                    </ul>

                </form>
            </div>
        </div>
    )
}



export default OffersUploader;