import { useState, useRef } from "react";

import classes from "./AuthForm.module.css";
import { useContext } from "react";
import AuthContext from "../../store/auth-ctx";
import UserProfile from "../Profile/UserProfile";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const emailRef = useRef();
  const pwdRef = useRef();
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredMailId = emailRef.current.value;
    const enteredPwd = pwdRef.current.value;
    setIsLoading(true);
    if (isLogin) {
      const authResponse = await fetch(
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
      );

      setIsLoading(false);
      const authData = await authResponse.json();
      authCtx.login(authData.idToken);
    } else {
      const signupResponse = fetch(
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
      );
      setIsLoading(false);
      alert("Your account has been created successfully!");
      emailRef.current.value = "";
      pwdRef.current.value = "";
    }
  };

  return (
    <>
      {!authCtx.isLoggedIn && (
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
      )}
      {authCtx.isLoggedIn && <UserProfile />}
    </>
  );
};

export default AuthForm;
