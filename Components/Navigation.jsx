import { Link, Route, Routes } from "react-router-dom"; 
import { useState, useRef, useEffect } from "react";
import AuthDetails from "./AuthDetails.jsx"
import styles from "../Styles/navigation.module.css";

const Navigation = ({setUserUid , userUid}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navRef = useRef(null);

  const navClasses = isOpen
    ? `${styles.navContainer} ${styles.open} `
    : `${styles.navContainer}`;

  const menuHandling = () => {
    if(isOpen === false){
        setIsOpen(true)
    }else{
        setIsOpen(false)
    }
  };
  const outsideClickHandling = (e) =>{
    if (navRef.current && !navRef.current.contains(e.target)){
        setIsOpen(false);
    }
  };
  useEffect(()=>{
    document.addEventListener("click",outsideClickHandling);
  },[])

  return (
    <>
      <nav className={styles.wrapper}>
        <Link to="/"><img src="/images/logo.svg" alt="logo" /></Link>
        
        <div className={navClasses} ref={navRef}>
          <div>
            <ul className={styles.aboutLinks}>
              <li onClick={() => {menuHandling()}}>
                Features
              </li>
              <li onClick={() => {menuHandling()}}>
                Pricing
              </li>
              <li onClick={() => {menuHandling()}}>
                Resources
              </li>
            </ul>
          </div>

          <div>
            <ul className={styles.logIn}>
              <li>
                <AuthDetails setUserUid={setUserUid} />
              </li>
              {userUid === "" ? (
                <>
                <li onClick={() => {menuHandling()}} >
                  <Link to="/signin">Log In</Link>
                </li>
                <li onClick={() => {  menuHandling()}}>
                  <Link to="/signup">Sign Up</Link>
                </li>
                </>
              ):null}
            </ul>
          </div>
        </div>
        <button className={styles.hamburger}
          onClick={(e) => {
            e.stopPropagation();
            menuHandling();
          }}>
          <img src="/images/hamburger.svg" alt="" />
        </button>
        
      </nav>
    </>
  );
};
export default Navigation;
