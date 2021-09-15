import React from 'react';
import Rating  from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider'
import { itemType } from '../App';
import './productItem.css'

type props = {
    product: itemType;
    handleAddToCart: (clickedItem: itemType)=>void;
}

const ProductItem: React.FC<props> = ({product, handleAddToCart}) => {
    const description: string[] = product.description.split('.');

    return (
        <div className='product-card'>
            <div className='product-image'>
                <img src={product.image} alt={product.title} />
            </div>
            <div className='product-info'>
                <Divider style={{background: 'black', margin:'0px 0px 10px 0px'}}/>
                <h6>{product.title}</h6>
                <p id='product-description'>{description.slice(0,3).join('. ')}</p>
            </div>
            <div className='card-foot'>
                <Divider style={{background: 'black', margin:'0px 0px 5px 0px'}}/>
                <div className="ratings">
                    <h6 className='price mt-auto'>${product.price}</h6>
                    <div className='d-flex justify-content-center'>
                        <Rating name="read-only" value={product.rating.rate} readOnly />
                        <span>({product.rating.count})</span>
                    </div>
                </div>
                <Button variant="contained" color='primary' style={{borderRadius:'0px 0px 8px 8px', marginBottom:'0px', color:'white', width: '100%'}} className='add-to-cart' onClick={()=>handleAddToCart(product)}>Add to Cart</Button>
            </div>

        </div>
    )
}

export default ProductItem
