import { useContext } from 'react';
import { appContext } from './contexts/appContext';
import { useQuery } from 'react-query';
import Products from './Products/Products';
import Cart from './Cart/Cart';
import { LinearProgress, Drawer } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import { Typography, AppBar, Toolbar } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Container } from 'react-bootstrap'
import './App.css';

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

  const { data, isLoading, isError } = useQuery<itemType[]>('products', fetchProducts);

  const getTotalCartItems = (cartItems: itemType[]):number =>(
    cartItems.reduce((acc,cartItem)=>{
    return acc + cartItem.amount;
    }, 0)
  )

  const { cartItems, setIsCartOpen, isCartOpen } = useContext(appContext);

  return (
    <div className="App" >
        <AppBar position="fixed" elevation={0}>
            <Toolbar >
              <Typography variant="h6">
                Shopping Avenue
              </Typography>

              <IconButton aria-label="cart"  aria-describedby={'simple-popper'} onClick={()=>setIsCartOpen!(true)} style={{marginLeft:'auto'}}>

                <Badge badgeContent={getTotalCartItems(cartItems as itemType[])} color="secondary" overlap="circular">
                  <ShoppingCartIcon  style={{fontSize:'40px', color:'#fff'}} />
                </Badge>
            
              </IconButton>
            </Toolbar>
        </AppBar>          
      {isError?<h1>Something went Wrong</h1>: null}
      {isLoading?<LinearProgress variant='indeterminate' color='secondary' style={{marginTop:'64px'}}/>:(

        <Container>
            <Drawer anchor={'right'} open={isCartOpen} onClose={()=>setIsCartOpen!(false)}>
              <Cart/>
            </Drawer>

            <div style={{margin:'100px 0px'}}>
              <Products products={data as itemType[]} />
            </div>
        </Container>
      )}

    </div>
  );
}

export default App;
