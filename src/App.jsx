import { useState } from "react";
import { Route, Routes, useNavigate,Navigate } from "react-router-dom";
import "./App.css";
import Navigation from "../Components/Navigation";
import Main from "../Components/Main";
import SignUp from "../Components/SignUp";
import SignIn from "../Components/SignIn";
import FavouriteLinks from "../Components/FavouriteLinks";
import PageNotFound from "../Components/PageNotFound";
function App() {
  const navigateTo = useNavigate();
  const [userUid, setUserUid] = useState("");
  return (
    <>
      <div className="Page">
        <Navigation setUserUid={setUserUid} userUid={userUid} />
        <Routes>
          <Route path="/" element={<Main userUid={userUid} />} />
          <Route path="/signup" element={<SignUp navigateTo={navigateTo} setUserUid={setUserUid} />} />
          <Route path="/signin"element={<SignIn navigateTo={navigateTo} setUserUid={setUserUid} />} />
          <Route path="/favourites" element={userUid ? (<FavouriteLinks userUid={userUid} />) : (<Navigate to="*" />)} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
