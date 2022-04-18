import { useReducer } from "react";

// Setting our initial state values for the useReducer hook.
const initialInputState = {
  value: "",
  isTouched: false,
};

// Our main reducer function that is responsible of managing, updating the states and dispatching different actions.
const inputStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === "BLUR") {
    return { isTouched: true, value: state.value };
  }
  if (action.type === "RESET") {
    return { isTouched: false, value: "" };
  }
  return inputStateReducer;
};

// The custom hook that we gonna put all our logic inside of it and then export it to other components.
const useInput = (validateValue) => {
  // The main useReducer hook call.
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  // This is later gonna be like function we can use in other components.
  const valueIsValid = validateValue(inputState.value);

  // Simple logic that returns false if the users enters unvalid values.
  const hasError = !valueIsValid && inputState.isTouched;

  // This function is gonna be called onChange, so whenever the user inputs any values.
  const valueChangeHandler = (event) => {
    dispatch({ type: "INPUT", value: event.target.value });
  };

  // This fuction is gonna be called onBlur, so whenever the user only clicks on one of the inputs.
  const inputBlurHandler = (event) => {
    dispatch({ type: "BLUR" });
  };

  // The reset function is gonna reset the whole states to the original values.
  const reset = () => {
    dispatch({ type: "RESET" });
  };

  // Returning everything we want to shaer and outsource from this custom hook in order to use it in other components.
  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
