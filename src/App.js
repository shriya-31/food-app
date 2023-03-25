import React, {useState} from 'react';

import Header from './Layout/Header';
import Meals from './Meals/Meals';
import Cart from './Cart/Cart';
import CartProvider from './store/CartProvider';

function App() {
  const [cartIsVisible, setCartIsVisisble] = useState(false);

  const showCartHandler = () => {
    setCartIsVisisble(true);
  }
  const hideCartHandler = () => {
    setCartIsVisisble(false);
  }

  return (
    <CartProvider>
    {/* position of Cart componet here doesnt matter as we are using Portal to insert it into the DOM  */}
    {cartIsVisible && <Cart onClose={hideCartHandler}></Cart>}
    <Header onShowCart={showCartHandler}></Header>
    <main> <Meals/> </main>
    </CartProvider>
  );
}

export default App;
