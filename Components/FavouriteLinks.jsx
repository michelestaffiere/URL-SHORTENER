import {
  onValue,
  ref,
  getDatabase,
  remove,
  get,
  child,
} from "firebase/database";
import { dbRef } from "../lib/firebase";
import { useEffect, useState } from "react";
import styles from "../Styles/favouriteLinks.module.css";
import { copyToClickBoard } from "../lib/copyToClickBoard";
import Footer from "./Footer";

const FavouriteLinks = ({ userUid, children }) => {
  const [linksFromDb, setLinksFromDb] = useState({});
  const [linkCopied, setLinkCopied] = useState({});

  const db = getDatabase();
  const userDbRef = ref(db, `users/${userUid}/savedLinks`);

  const removeFromDb = (e) => {
    const link = e.target.previousSibling.innerText;
    get(userDbRef).then((snapShot) => {
      if (snapShot.exists()) {
        const data = snapShot.val();
        const nodeToRemove = Object.keys(data).find(
          (key) => data[key].short === link
        );
        if (nodeToRemove) {
          const nodeRef = child(userDbRef, nodeToRemove);
          remove(nodeRef)
            .then(() => {
              console.log("removed.");
            })
            .catch((error) => {
              console.error(error);
            });
        }
      } else {
        console.error("No matching data found in user instance");
      }
    });
  };

  const handleCopy = (e, linkKey) => {
    let link = e.target.parentNode.children[0].innerText;
    copyToClickBoard(link);
    setLinkCopied({ ...linkCopied, [linkKey]: true });
  };
  useEffect(() => {
    onValue(userDbRef, (snapShot) => {
      const data = snapShot.val();
      console.log(snapShot);
      setLinksFromDb(data);
    });
  }, [userUid]);
  return (
    <section className={styles.favouritesContainer}>
      <div className={styles.favourites}>
        <h1>Favourites</h1>
        {userUid === "" ? (
          <p>Sign In to see your personal links!</p>
        ) : (
          <div className={styles.container}>
            <ul className={styles.favouriteList}>
              {linksFromDb === null ? (
                <p>Favourite some links to see them appear here! </p>
              ) : (
                Object.entries(linksFromDb).map(([key, value]) => {
                  return (
                    <li key={key}>
                      <div className={styles.longLink}>
                        <p>{value.long}</p>
                      </div>
                      <div className={styles.shortLink}>
                        <p>{value.short}</p>
                        <button
                          onClick={(e) => {
                            removeFromDb(e);
                          }}
                        >
                          Remove
                        </button>
                        <button
                          onClick={(e) => {
                            handleCopy(e, key);
                          }}
                        >
                          {linkCopied[key] ? "Copied" : "Copy"}
                        </button>
                      </div>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        )}
      </div>
      <>
        <Footer />
      </>
    </section>
  );
};

export default FavouriteLinks;
