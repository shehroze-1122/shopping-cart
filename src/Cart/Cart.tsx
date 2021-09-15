import CartItem from '../CartItem/CartItem';
import { itemType } from '../App';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
import './cart.css'

type props = {
    cartItems: itemType[],
    handleAddToCart: (clickedItem: itemType)=> void,
    removeFromCart: (id: number)=> void,
    setIsCartOpen: (val: boolean)=> void
}

const Cart: React.FC<props> = ({cartItems, handleAddToCart, removeFromCart, setIsCartOpen}) => {
    const getTotal = ():number=>{
        return cartItems.reduce((acc, cartItem)=> acc + (cartItem.amount*cartItem.price), 0)
    }
    return (
        <aside className='cart'>
            <IconButton onClick={()=>setIsCartOpen(false)} style={{position: 'absolute', top: 0, left: 0}} >
                <CloseIcon/>
            </IconButton>
            <div className='cart-header'>                    
                <h3>Cart</h3>
                <h3> Your Total: ${getTotal().toFixed(2)}</h3>
            </div>
            <div className='cart-items'>
                {cartItems.length?cartItems.map((cartItem)=><CartItem key={cartItem.id} cartItem={cartItem} handleAddToCart={handleAddToCart} removeFromCart={removeFromCart}/>):<p>Cart is currently empty</p>}
            </div>
        </aside>
    )
    }

export default Cart
