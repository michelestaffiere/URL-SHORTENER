import { useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { Link } from "react-router-dom";
import styles from "../Styles/authDetails.module.css";

const AuthDetails = ({setUserUid}) => {
  const [authUser, setAuthUser] = useState(null);
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
      return() =>{
        listen();
      }
    });
  }, []);

  useEffect(()=>{
      if(authUser != null){
        setUserUid(authUser.uid)
      }
  },[authUser])

  const userSignOut = () =>{
    signOut(auth).then(() =>{
        console.log("Signed Out")
        setUserUid("")
    }).catch(error => console.log(error))
  }
  return (
    <>
      <div className={styles.user}>
        {authUser ? 
          (
          <>
          <Link to="/favourites" className={styles.link}>Favourites</Link>
          <p>{`${authUser.email}`}</p> 
          <br></br>
          <button onClick={userSignOut}>Sign Out</button>
          <br></br>
          </>
          ) : 
          (null)
        }
      </div>
    </>
  );
};

export default AuthDetails;