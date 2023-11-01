import React from "react";
import { useEffect, useState } from "react";
import { readLocalStorage, removeHandling } from "../lib/localStorageHandling";
import { copyToClickBoard } from "../lib/copyToClickBoard";
import { database } from "../lib/firebase";
import { ref, set, push } from "firebase/database";
import styles from "../Styles/savedLinks.module.css";

const SavedLinks = ({
  shortDuringSessionLinks,
  normalDuringSessionLinks,
  setNormalLinksDuringSession,
  setShortLinksDuringSession,
  userUid,
}) => {
  const [longLinks, setLongLinks] = useState([]);
  const [shortLinks, setShortLinks] = useState([]);
  const [intialCheck, setIntialCheck] = useState(false);
  const [show, setShow] = useState(false);
  const [linkCopied, setLinkCopied] = useState([]);
  const [buttonClicked, setButtonClicked] = useState({});

  //reference to users instance in realtime database
  const usersSavedLinks = ref(database, `users/${userUid}/savedLinks`);

  const handleCopy = (e, link) => {
    copyToClickBoard(link);
    setLinkCopied([...linkCopied, link]);
    setButtonClicked({ ...buttonClicked, [link]: true });
  };

  const handleFavourite = (e) => {
    const firebaseObj = push(usersSavedLinks,
      {
        long:`${e.target.parentNode.previousSibling.innerText}`,
        short:`${e.target.previousSibling.innerText}`
      }
      );
  };

  useEffect(() => {
    let currentStorage = readLocalStorage();
    let _longLinks = [...longLinks];
    let _shortLinks = [...shortLinks];
    if (currentStorage) {
      currentStorage.forEach((item) => {
        _longLinks.push(item[0]);
        _shortLinks.push(item[1]);
      });
    }
    setLongLinks(_longLinks);
    setShortLinks(_shortLinks);
    setIntialCheck(true);
  }, []);

  useEffect(() => {
    if (intialCheck) {
      let _shortLinks = [...shortLinks];
      let _longLinks = [...longLinks];

      _longLinks.push(
        normalDuringSessionLinks[normalDuringSessionLinks.length - 1]
      );

      _shortLinks.push(
        shortDuringSessionLinks[shortDuringSessionLinks.length - 1]
      );

      setLongLinks(_longLinks);
      setShortLinks(_shortLinks);
    }
  }, [shortDuringSessionLinks, normalDuringSessionLinks]);
  return (
    <div className={`${styles.wrapper} ${styles.savedLinksContainer}`}>
      {!show ? (
        <button
          onClick={() => {
            setShow(true);
          }}
        >
          Show Saved Links
        </button>
      ) : (
        <>
          <button
            onClick={() => {
              setShow(false);
            }}
          >
            Hide
          </button>
          <ul>
            {longLinks.map((link, index) => {
              return (
                <li key={index}>
                  <div className={styles.normal}>
                    <p>{link}</p>
                  </div>
                  <div className={styles.short}>
                    <p>{shortLinks[index]}</p>
                    {/* shortLink = e.target.previousSibling.innerText 
                        longLink = e.target.parentNode.previousSibling.innerText
                    */}
                    <button onClick={(e) => handleFavourite(e)}>Favourite</button>
                    <button onClick={(e) => console.log(e)}>remove</button>
                    <button
                      className={buttonClicked[link] ? styles.copied : ""}
                      onClick={(e) => {
                        handleCopy(e, link);
                      }}
                    >
                      {linkCopied.includes(link) ? "Copied!" : "Copy Link"}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default SavedLinks;
