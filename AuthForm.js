import { useState, useRef } from "react";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isSignUpBtnClicked, setIsSignUpBtnClicked] = useState(false);
  const emailRef = useRef();
  const pwdRef = useRef();
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);

    setIsSignUpBtnClicked(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredMailId = emailRef.current.value;
    const enteredPwd = pwdRef.current.value;

    if (isLogin) {
    } else {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyDVg383Q9Obw_imsQzsLRUj65bQVspoXJg",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredMailId,
            password: enteredPwd,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        if (res.ok) {
        } else {
          res.json().then((data) => {
            console.log(data);
          });
        }
      });
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" ref={emailRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" ref={pwdRef} required />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "create new account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
          {isSignUpBtnClicked && <p>sending request...</p>}
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
