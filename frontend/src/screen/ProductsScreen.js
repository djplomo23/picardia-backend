import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveProduct, listProducts, deleteProduct } from '../actions/productActions';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import CKEditor from "@ckeditor/ckeditor5-react"




function ProductsScreen(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');


    const productList = useSelector((state) => state.productList);
    const {
        products,
    } = productList;

    const productSave = useSelector((state) => state.productSave);
    const {
        loading: loadingSave,
        success: successSave,
        error: errorSave } = productSave;

    const productDelete = useSelector((state) => state.productDelete);
    const {

        success: successDelete,
    } = productDelete;
    const dispatch = useDispatch();


    useEffect(() => {
        if (successSave) {
            setModalVisible(false);
        }
        dispatch(listProducts());
        return () => {
            //
        };
    }, [successSave, successDelete]);

    const openModal = (product) => {
        setModalVisible(true);
        setId(product._id);
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setImage(product.images);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);




    };





    const submitHandler = (e) => {
        e.preventDefault();


        dispatch(
            saveProduct({
                _id: id, name,
                price, image, brand, category,
                countInStock, description
            }));



    };

    const deleteHandler = (product) => {
        dispatch(deleteProduct(product._id));
    }
    return (<div className="container content-margined">

        <div className="col-md-8">
            <div className="product-header">
                <div><h3>Products</h3></div>
                <div className="btnProduct"><button className="button primary"
                    onClick={() => openModal({})}>Create Product</button></div>
            </div>
        </div>
        {modalVisible && (
            <div className="form">
                <form onSubmit={submitHandler}>
                    <ul className="form-container">
                        <li><h2>Create Product</h2></li>
                        <li>
                            {loadingSave && <div>Loading...</div>}
                            {errorSave && <div>{errorSave}</div>}
                        </li>
                        <li>
                            <label htmlFor="name">
                                Name
                    </label>
                            <input type="text" name="name" id="name"
                                value={name || ''} onChange={(e) => setName(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="price">Price</label>
                            <input type="number" id="price" name="price"
                                value={price || ''} onChange={(e) =>
                                    setPrice(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="image">
                                Image
                    </label>
                            <input type="text" name="image"
                                value={image || ''} id="image"
                                onChange={(e) => setImage(e.target.value)}  />
                        </li>
                        <li>
                            <label htmlFor="brand">
                                Brand
                    </label>
                            <input type="text" name="brand"
                                id="brand" value={brand || ''}
                                onChange={(e) => setBrand(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="category">
                                Category
                    </label>
                            <input type="text" name="category"
                                id="category" value={category || ''}
                                onChange={(e) => setCategory(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="countInStock">
                                stock
                    </label>
                            <input type="text" name="countInStock"
                                id="countInStock" value={countInStock || ''}
                                onChange={(e) => setCountInStock(e.target.value)} />
                        </li>

                        <li>
                            <label htmlFor="description">
                                Description
                    </label>
                            <CKEditor name="description"
                                id="description"
                                editor={ClassicEditor}
                                data={description || ''}
                                onInit={editor => {
                                    // You can store the "editor" and use when it is needed.
                                    console.log('Editor is ready to use!', editor);
                                }}
                                onChange={(e, editor) => {
                                    const data = editor.getData();
                                    setDescription(data)
                                    console.log({ editor, data });
                                }}

                            />

                        </li>

                        <li>
                            <button type="submit" className="button primary">
                                {id ? 'Update' : 'Create'}</button>
                        </li>
                        <li>
                            <button
                                type="button"
                                onClick={() => setModalVisible(false)}
                                className="button secondary">Back</button>
                        </li>

                    </ul>
                </form>
            </div>
        )}

        <div className="col-md-8">

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Image</th>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Category</th>
                        <th scope="col">Brand</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>

                    {products.map((product) => (

                        <tr key={product._id}>

                            <img src={product.image} />
                            <td scope="row">{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price} RD$</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>

                            <td>

                                <button className="button" onClick={() => openModal(product)}>Edit</button>
                                {' '}
                                <button className="button" onClick={() => deleteHandler(product)}>Delete</button>
                            </td>

                        </tr>
                    ))}

                </tbody>
            </table>

        </div>
    </div>
    );

}

export default ProductsScreen;