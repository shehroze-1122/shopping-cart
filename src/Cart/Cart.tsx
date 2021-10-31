import CartItem from '../CartItem/CartItem';
import { appContext } from '../contexts/appContext';
import { itemType } from '../App';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { IconButton } from '@material-ui/core';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import { Divider } from '@material-ui/core';
import './cart.css'
import { useContext } from 'react';


const Cart: React.FC = () => {

    const { cartItems, setIsCartOpen } = useContext(appContext);

    const getTotal = ():number=>{
        return cartItems!.reduce((acc: number, cartItem: itemType)=> acc + (cartItem.amount*cartItem.price), 0)
    }
    
    return (
        <aside className='cart'>
            <IconButton onClick={()=>setIsCartOpen!(false)} style={{position: 'absolute', top: '5px', left: '15px'}} >
                <ArrowBackIosIcon style={{ fontSize: '20px' }}/><span style={{ fontSize: '20px' }}>Home</span>
            </IconButton>
            <div className='cart-header'>                    
                <h3>My Cart<ShoppingCart fontSize='medium' style={{marginLeft:'5px'}}/></h3>
                <h3> Total: ${getTotal().toFixed(2)}</h3>
            </div>
            <Divider variant="middle" style={{backgroundColor:'#333'}}/>
            <div className='cart-items'>
                {cartItems!.length?cartItems!.map((cartItem: itemType)=><CartItem key={cartItem.id} cartItem={cartItem} />):<div className='no-item-message'><p>There are no items in this cart</p></div>}
            </div>
        </aside>
    )
    }

export default Cart
