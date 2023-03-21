import classes from "./ProfileForm.module.css";
import { useRef, useState } from "react";
import AuthContext from "../../store/auth-ctx";
import { useContext } from "react";

const ProfileForm = () => {
  const newPwdRef = useRef();
  const authCtx = useContext(AuthContext);

  const newPwdSubmitHandler = (e) => {
    e.preventDefault();
    const newPwd = newPwdRef.current.value;
    console.log(newPwd);
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDVg383Q9Obw_imsQzsLRUj65bQVspoXJg",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: newPwd,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        authCtx.logout();
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <form className={classes.form} onSubmit={newPwdSubmitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPwdRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
