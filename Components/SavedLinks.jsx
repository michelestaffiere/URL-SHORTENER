import { useEffect, useState } from "react";
import { readLocalStorage } from "../lib/localStorageHandling";
import { copyToClickBoard } from "../lib/copyToClickBoard";
import { database, dbRef } from "../lib/firebase";
import { push, get, child } from "firebase/database";
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
  const [favourite, setFavourite] = useState([]);

  const handleCopy = (e, link) => {
    copyToClickBoard(e.target.parentNode.children[0].innerText);
    setLinkCopied([...linkCopied, link]);
    setButtonClicked({ ...buttonClicked, [link]: true });
  };

  const handleFavourite = (e) => {
    if (userUid === "") return;
    const shortLinkToCheck = e.target.previousSibling.innerText;
    // Reference to the savedLinks node for the user
    const savedLinksRef = child(dbRef, `users/${userUid}/savedLinks`);
    // First, read the existing data in the savedLinks node
    get(savedLinksRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const isDuplicate = Object.values(data).some(
          (item) => item.short === shortLinkToCheck
        );
        if (!isDuplicate) {
          // No duplicate found, add the new link to savedLinks
          push(savedLinksRef, {
            long: e.target.parentNode.previousSibling.innerText,
            short: shortLinkToCheck,
          });
        } else {
          return; // Break out - duplicate found.
        }
      } else {
        // No data exists, for this user so push it anyways to create the users savedLinks collection.
        push(savedLinksRef, {
          long: e.target.parentNode.previousSibling.innerText,
          short: shortLinkToCheck,
        });
      }
    });
    setFavourite([...favourite, shortLinkToCheck]);
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
          className={styles.showButton}
        >
          Show Saved Links
        </button>
      ) : (
        <>
          <button
            onClick={() => {
              setShow(false);
            }}
            className={styles.hideButton}
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
                    <button
                      disabled={!userUid}
                      onClick={(e) => {
                        handleFavourite(e);
                      }}
                      className={
                        favourite.includes(shortLinks[index])
                          ? styles.favourite
                          : ""
                      }
                    >
                      {favourite.includes(shortLinks[index])
                        ? "Favourited"
                        : "Favourite"}
                    </button>
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
