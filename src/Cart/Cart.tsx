import CartItem from '../CartItem/CartItem';
import { itemType } from '../App';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { IconButton } from '@material-ui/core';
import { Divider } from '@material-ui/core';
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
            <IconButton onClick={()=>setIsCartOpen(false)} style={{position: 'absolute', top: '5px', left: '15px'}} >
                <ArrowBackIosIcon style={{ fontSize: '20px' }}/><span style={{ fontSize: '20px' }}>Home</span>
            </IconButton>
            <div className='cart-header'>                    
                <h3>My Cart</h3>
                <h3> Total: ${getTotal().toFixed(2)}</h3>
            </div>
            <Divider variant="middle" style={{backgroundColor:'#333'}}/>
            <div className='cart-items'>
                {cartItems.length?cartItems.map((cartItem)=><CartItem key={cartItem.id} cartItem={cartItem} handleAddToCart={handleAddToCart} removeFromCart={removeFromCart}/>):<div className='no-item-message'><p>There are no items in this cart</p></div>}
            </div>
        </aside>
    )
    }

export default Cart
