import { useContext, useState, useEffect } from "react";

import classes from "./HeaderCartButton.module.css"

import CartIcon from "../Cart/CartIcon"
import CartContext from "../store/cart-context";

export default function HeaderCartButton(props){

  const[btnAnimationWorks, setBtnAnimationWorks] = useState(false);

  const cartCtx = useContext(CartContext); 
  const numItemsInCart = cartCtx.items.reduce((accumulator, item) => { return accumulator + item.amount}, 0)
  const { items } = cartCtx; 
  const btnClasses = `${classes.button} ${btnAnimationWorks ? classes.bump : ""}`;

  useEffect(() => {
    //ensure that animations works when cart has atleast 1 item 
    if (cartCtx.items.length === 0){
      return; 
    }
    setBtnAnimationWorks(true); 

    //removing the animation class once its played so that on a new item add/remove in cart, the animation works again 
    //300 cause animation lasts for 300 ms 
    const timer = setTimeout(() => {
      setBtnAnimationWorks(false);
    }, 300)

    //cleanup function to remove any ongoing side effects when the component is removed / rerendered
    return () => {
      clearTimeout(timer)
    }

  }, [items])

    return (
      <button className={btnClasses} onClick={props.onCartClick}>
        <span className={classes.icon}>
          <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numItemsInCart}</span>
      </button>
    );
}