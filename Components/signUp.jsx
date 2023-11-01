import { useState } from "react"; 
import { auth, database } from "../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {ref,set } from "firebase/database";


const SignUp = ({navigateTo,setUserUid}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignUp = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password).then((userCreds) => {
      const uid = userCreds.user.uid;
      const userRef = ref(database, `users/${uid}`);
      const data = {
        email: email,
        savedLinks: {}
      };
      set(userRef, data).then(() => {
        setUserUid(uid);
        navigateTo("/");
      });
    });
  };

  return (
    <div>
      <p>Create Account</p>
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          placeholder="E-mail"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};
export default SignUp;
