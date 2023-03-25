import mealsImg from "../resources/meals.jpg"
import classes from "./Header.module.css"

import HeaderCartButton from "./HeaderCartButton";
export default function Header(props){
    return (
      <>
        <header className={classes.header}>
          <h1>React Meals</h1>
          <HeaderCartButton onCartClick={props.onShowCart}/>
        </header>
        <div className={classes['main-image']}>
          <img src={mealsImg} alt="A table with delicious food" />
        </div>
      </>
    );
}