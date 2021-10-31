import React, { useState, createContext} from "react";
import { itemType } from "../App";

interface contextType{

    cartItems?: itemType[],
    isCartOpen?: boolean,
    setIsCartOpen?: React.Dispatch<React.SetStateAction<boolean>>,
    handleAddToCart?: (clickedItem: itemType) => void,
    removeFromCart?: (id: number)=> void
}

export const appContext = createContext<contextType>({});

export const AppContext: React.FC = (props) =>{

    const [ isCartOpen, setIsCartOpen ] = useState(false);
    const [ cartItems, setCartItems ] = useState([] as itemType[]);

    const handleAddToCart = (clickedItem: itemType) => {

        const isInCart = cartItems.find((cartItem) => cartItem.id === clickedItem.id);

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

    return(
        <appContext.Provider value={{ 
                                cartItems: cartItems,
                                isCartOpen: isCartOpen, 
                                setIsCartOpen: setIsCartOpen, 
                                handleAddToCart: handleAddToCart, 
                                removeFromCart: removeFromCart, 
                                }}>
            {props.children}
        </appContext.Provider>

    )
}