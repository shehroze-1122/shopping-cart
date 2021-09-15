import { useState } from 'react';
import { useQuery } from 'react-query';
import Products from './Products/Products';
import Cart from './Cart/Cart';
import { LinearProgress, Drawer } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Container } from 'react-bootstrap'

export type itemType = {
  id: number,
  title: string,
  category: string,
  price: number,
  description: string,
  image: string,
  rating: {rate: number, count: number},
  amount: number
}

const fetchProducts =  async (): Promise <itemType[]> =>{
  const resp = await fetch('https://fakestoreapi.com/products');
  return await resp.json();
}

const App = () => {
  const [ isCartOpen, setIsCartOpen ] = useState(false);
  const [ cartItems, setCartItems ] = useState([] as itemType[]);
  const { data, isLoading, isError } = useQuery<itemType[]>('products', fetchProducts);

  const getTotalCartItems = (cartItems: itemType[]):number =>(
    cartItems.reduce((acc,cartItem)=>{
      return acc + cartItem.amount;
    }, 0)
  )


  const handleAddToCart = (clickedItem: itemType) => {
    const isInCart = cartItems.find((cartItem)=> cartItem.id === clickedItem.id);
    if(isInCart){
      setCartItems(cartItems.map((cartItem)=>{
        if(cartItem.id===clickedItem.id){
          return {...cartItem, amount: cartItem.amount + 1}
        }
        return {...cartItem}
      }))
    }else{
      setCartItems(prev=>[...prev, {...clickedItem, amount:1}])
    }
  };

  const removeFromCart = (id: number)=>{
    setCartItems(
      cartItems.reduce((acc, cartItem)=>{

      if(cartItem.id === id){
        if(cartItem.amount===1){
          return acc;
        }else{
          return [...acc, { ...cartItem, amount: cartItem.amount-1}]
        }
      }else{
        return [...acc, cartItem];
      }
    }, [] as itemType[]))

  }

  return (
    <div className="App" >

      {isError?<h1>Something went Wrong</h1>: null}
      {isLoading?<LinearProgress/>:(
        <Container>
          <IconButton aria-label="cart" onClick={()=>setIsCartOpen(true)} style={{position:'fixed', top:'10px', right:'30px', zIndex: 100}}>
            <Badge badgeContent={getTotalCartItems(cartItems)} color="primary" overlap="circular">
              <ShoppingCartIcon  style={{fontSize:'50px'}} color='secondary'/>
            </Badge>
          </IconButton>
          <Drawer anchor={'right'} open={isCartOpen} onClose={()=>setIsCartOpen(false)}>
             <Cart cartItems={cartItems} handleAddToCart={handleAddToCart} removeFromCart={removeFromCart} setIsCartOpen={setIsCartOpen}/>
          </Drawer>
          <div style={{margin:'80px 0px'}}>
            <Products products={data as itemType[]} handleAddToCart={handleAddToCart} />
          </div>
        </Container>
      )}

    </div>
  );
}

export default App;
