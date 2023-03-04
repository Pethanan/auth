import { useState, useRef } from "react";

import classes from "./AuthForm.module.css";
import { useContext } from "react";
import AuthContext from "../../store/auth-ctx";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const emailRef = useRef();
  const pwdRef = useRef();
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredMailId = emailRef.current.value;
    const enteredPwd = pwdRef.current.value;
    setIsLoading(true);
    if (isLogin) {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDVg383Q9Obw_imsQzsLRUj65bQVspoXJg",
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
        setIsLoading(false);
        if (res.ok) {
          res.json().then((data) => {
            authCtx.login(data.idToken);
            return console.log(data.idToken);
          });
        } else {
          return res.json().then((data) => {
            console.log(data && data.error && data.error.message);
            alert("authentication failed");
          });
        }
      });
    } else {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDVg383Q9Obw_imsQzsLRUj65bQVspoXJg",
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
        setIsLoading(false);
        if (res.ok) {
        } else {
          return res.json().then((data) => {
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
          {!isLoading && (
            <button>{isLogin ? "Login" : "create new account"}</button>
          )}
          {isLoading && <p>sending request...</p>}

          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
