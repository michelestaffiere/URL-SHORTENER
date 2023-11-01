import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Navigation from "../Components/Navigation.jsx";
import Main from "../Components/main";
import SignUp from "../Components/signUp";
import SignIn from "../Components/signIn";
function App() {
  const navigateTo = useNavigate();
  const [userUid,setUserUid] = useState("");
  return (
    <>
      <div className="Page">
        <Navigation setUserUid={setUserUid} userUid={userUid} />
        <Routes>
          <Route path="/" element={<Main userUid={userUid} />} />
          <Route path="/signup" element={<SignUp navigateTo={navigateTo} setUserUid={setUserUid} />} />
          <Route path="/signin" element={<SignIn navigateTo={navigateTo}  setUserUid={setUserUid} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
