import useInput from "../hooks/use-input";

// This function is for the validation of the FirstName and LastName inputs, it's gonna be called inside of the call of our imported custom hook useInput().
const isNotEmpty = (value) => value.trim() !== "";

// This function is for the validation of the email input, it's gonna be called inside of the call of our imported custom hook useInput().
const isEmail = (value) => value.includes("@");

const BasicForm = () => {
  // Extracting all the needed logic for the FirstName validation and calling the isNotEmpty function inside of our custom hook().
  const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput(isNotEmpty);

  // Extracting all the needed logic for the LastName validation and calling the isNotEmpty function inside of our custom hook().
  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useInput(isNotEmpty);

  // Extracting all the needed logic for the Email validation and calling the isEmail function inside of our custom hook().
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);

  // Simple logic that we are gonna use later for validating the Submit button.
  let formIsValid = false;

  // If all the inputs are filled by the user then we validate.
  if (firstNameIsValid && lastNameIsValid && emailIsValid) {
    formIsValid = true;
  }

  // The main submit function that we gonna call when the user submit the form.
  const submitHandler = (event) => {
    event.preventDefault();

    // If one of the inputs are not valid then we stop and return.
    if (!formIsValid) {
      return;
    }

    // Then we reset all our inputs back to empty.
    resetFirstName();
    resetLastName();
    resetEmail();
  };

  // Simple logic to manipulate the css classes to do some changes on the UI.
  const firstNameClasses = firstNameHasError
    ? "form-control invalid"
    : "form-control";

  // The same here for the last Name.
  const lastNameClasses = lastNameHasError
    ? "form-control invalid"
    : "form-control";

  // And the email of course.
  const emailClasses = emailHasError ? "form-control invalid" : "form-control";

  // Wiring the whole thing, all the functions and values to our form so it can be work.
  return (
    <form onSubmit={submitHandler}>
      <div className="control-group">
        <div className={firstNameClasses}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            value={firstNameValue}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
          />
          {firstNameHasError && (
            <p className="error-text">Please enter a first name.</p>
          )}
        </div>
        <div className={lastNameClasses}>
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            id="name"
            value={lastNameValue}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
          />
          {lastNameHasError && (
            <p className="error-text">Please enter a last name.</p>
          )}
        </div>
      </div>
      <div className={emailClasses}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          type="email"
          id="name"
          value={emailValue}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailHasError && (
          <p className="error-text">Please enter a valid email address.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
