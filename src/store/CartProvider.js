import { useReducer } from "react"
import CartContext from "./cart-context"

const defaultCartState = {
    items: [], 
    totalAmount: 0
}
const cartReducer = (state, action) => {
    console.log(action);
    if (action.type === "ADD_ITEM"){
        const updatedTotalAmount = state.totalAmount + (action.item.price * action.item.amount);

        const existingCartItemIdx = state.items.findIndex((item) => { return (item.id === action.item.id)})
        const existingCartItem = state.items[existingCartItemIdx];

        let updatedItems; 

        if (existingCartItem){

            const updatedItem = {
                ...existingCartItem, 
                amount: existingCartItem.amount + action.item.amount
            }
            updatedItems=[...state.items] //deep copy of old array
            updatedItems[existingCartItemIdx] = updatedItem; 

        } else {

            updatedItems = state.items.concat(action.item);
        }

        return { items: updatedItems, totalAmount: updatedTotalAmount}

    } else if (action.type === "REMOVE_ITEM"){

        const existingCartItemIdx = state.items.findIndex((item) => {return (item.id === action.id)});
        const existingCartItem = state.items[existingCartItemIdx];  
        const updatedTotalAmount = state.totalAmount - existingCartItem.price; 

        let updatedItems; 

        if (existingCartItem.amount === 1){
            updatedItems = state.items.filter((item) => { return item.id !== action.id})
        } else {
            const updatedItem = {...existingCartItem, amount: existingCartItem.amount - 1};
            updatedItems = [...state.items]
            updatedItems[existingCartItemIdx] = updatedItem; 
        }
        return { items: updatedItems, totalAmount: updatedTotalAmount}
    }

    return defaultCartState; 
}
export default function CartProvider(props) {

    const [cartState, dispatchCardAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = (item) => {
        dispatchCardAction({type: "ADD_ITEM", item: item});
    }
    const removeItemFromCartHandler = (id) => {
        dispatchCardAction({type: "REMOVE_ITEM", id: id})
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
    }

    return(<CartContext.Provider value = {cartContext}>
        {props.children}
    </CartContext.Provider>)

}