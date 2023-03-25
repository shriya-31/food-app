import { useRef, useState } from "react";

import classes from "./MealItemForm.module.css"

import Input from "../../UI/Input"

export default function MealItemForm(props){

    const [amountIsValid, setAmountIsValid] = useState(true);
    const amountInputRef = useRef();
    
    const submitHandler = (event) => {
      //prevents the browsers action of reloading the page
      event.preventDefault();
      const enteredAmount = amountInputRef.current.value; //strign by default 
      const enteredAmountNumber = +enteredAmount; 

      if (enteredAmount.trim().length === 0 || enteredAmountNumber > 5 || enteredAmountNumber < 1){
        setAmountIsValid(false);
        return; 
      }

      props.onAddToCart(enteredAmountNumber);

    }
    return(
    <form className={classes.form} onSubmit={submitHandler}>
        {/* max and min are for validation i.e not more than 5 and not less than 1 */}
        <Input ref={amountInputRef} label="Amount" input={{
            id: "amount" + props.id,
            type: "number",
            min: "1",
            max: "5", 
            step: "1",
            defaultValue: "1"
        }}/>
        <button> + Add </button>
        {!amountIsValid && <p>Please enter a valid amount (1-5)</p>}
    </form>)
}