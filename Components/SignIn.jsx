import { useState } from "react";
import { auth } from "../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import styles from "../Styles/entryPortal.module.css"


const SignIn = ({navigateTo,setUserUid}) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage,setErrorMessage] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCreds) => {
        setErrorMessage(false);
        setUserUid(userCreds.user.uid);
        navigateTo("/")
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(true);

      });
  };

  return (
    <div className={`${styles.container} ${styles.wrapper}`}>
      <p>Welcome Back👋</p>
      <form onSubmit={handleSignIn}>
          <input 
          type="email" 
          placeholder="E-mail" 
          onChange={(e)=>{setEmail(e.target.value)}}
          value={email}
          />
          <input 
          type="password" 
          placeholder="Password" 
          onChange={(e)=>{setPassword(e.target.value)}}
          value={password}
          />
        <button type="submit">Login</button>
      </form>
        {errorMessage ? <p>Incorrect Email or Password, please try again.</p> : null}
        <p>Don't have an Account? , <Link to="/signup">Sign Up</Link></p>
    </div>
  );
};
export default SignIn;
