import React, { useState } from 'react';



const ProductGallery = (props) => {
    const [indexImg, setIndexImg] = useState(0)

    const { product } = props
    return (
        <div >
          
              
                    <img src={product.images[indexImg].url}  id="ProductImg" className="img-fluid large" alt={product.name}/>


                    <div className="small-img-row ">
                        {product.images.map((image, i) => 
                        <div className="small-img-col d-flex justify-content-between">
                            <img src={image.url} className="img-fluid small" alt={image.name} onClick={() => setIndexImg(i) } />
                        </div> )}
                        
                        
                    </div>




        </div>
    )
};

export default ProductGallery;