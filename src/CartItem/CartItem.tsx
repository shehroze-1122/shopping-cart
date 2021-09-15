import Button from '@material-ui/core/Button';
import { itemType } from '../App';
import './cartItem.css'

type props = {
    cartItem: itemType,
    handleAddToCart: (clickedItem: itemType)=>void,
    removeFromCart: (id: number)=> void
}
const CartItem: React.FC<props> = ({cartItem, handleAddToCart, removeFromCart}) => {

    return (
        <div>
            <div className='cart-item'>
                <div className='cart-item-info'>
                    <h5><span className='heading'>{cartItem.title}</span></h5>
                    <div className='cart-item-price'>
                        <p><span className='heading'>Price: </span> ${cartItem.price}</p>
                        <p><span className='heading'>Total Price: </span> ${(cartItem.amount * cartItem.price).toFixed(2)}</p>
                    </div>
                    <div className='cart-item-buttons'>
                        <Button variant='contained' size='small' color='default' onClick={()=>removeFromCart(cartItem.id)}>-</Button>
                        <label>{cartItem.amount}</label>
                        <Button variant='contained' size='small' color='default' onClick={()=>handleAddToCart(cartItem)}>+</Button>
                    </div>
                </div>
                <div>
                    <img src={cartItem.image} alt={cartItem.title} width='100px' />
                </div>
            </div>
            <hr/>
        </div>
    )
}

export default CartItem;
