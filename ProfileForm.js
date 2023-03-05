import classes from "./ProfileForm.module.css";
import { useRef, useState } from "react";
import AuthContext from "../../store/auth-ctx";
import { useContext } from "react";

const ProfileForm = () => {
  const [newPwd, setNewPwd] = useState("");
  const newPwdRef = useRef();
  const authCtx = useContext(AuthContext);

  const newPwdSubmitHandler = (e) => {
    e.preventDefault();
    setNewPwd(newPwdRef.current.value);
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDVg383Q9Obw_imsQzsLRUj65bQVspoXJg",
      {
        idToken: authCtx.token,
        newPassword: newPwd,
        returnSecureToken: true,
      }
    )
      .then((res) => {
        authCtx.logout();
        res.json();
      })
      .then((data) => {
        alert(data);
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
