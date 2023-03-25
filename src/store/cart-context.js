import React from "react";

const CartContext = React.createContext({
    items: [], 
    totalAmount: 0, 
    addItem: (item) => {}, 
    removeItem: (item) => {}
})
// these fields given in context to aid with autocompletion 

export default CartContext; 